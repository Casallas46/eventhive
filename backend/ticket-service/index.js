const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5003;
const EVENTS_SERVICE_URL = process.env.EVENTS_SERVICE_URL || 'http://events-service:5002';

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME || 'tickets_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'root',
  { host: process.env.DB_HOST || 'localhost', dialect: 'mysql', logging: false }
);

const Ticket = sequelize.define('Ticket', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  eventId: { type: DataTypes.INTEGER, allowNull: false },
  purchaseDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Comprar Ticket
app.post('/', async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    const ticket = await Ticket.create({ userId, eventId });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener un Ticket por ID
app.get('/:id', async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    if (isNaN(ticketId)) return res.status(400).json({ error: 'ID de ticket inválido' });

    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) return res.status(404).json({ error: 'Ticket no encontrado' });

    // Obtener detalles del evento desde el Events Service
    try {
      // Intentamos usar la URL de Docker, si falla usamos localhost como fallback para desarrollo local
      let eventUrl = `${EVENTS_SERVICE_URL}/${ticket.eventId}`;
      const eventRes = await axios.get(eventUrl).catch(async () => {
        const localUrl = `http://localhost:5002/${ticket.eventId}`;
        return await axios.get(localUrl);
      });

      res.json({
        id: ticket.id,
        purchaseDate: ticket.purchaseDate,
        userId: ticket.userId,
        event: eventRes.data
      });
    } catch (e) {
      console.error('Error fetching event details:', e.message);
      res.json({ 
        id: ticket.id, 
        purchaseDate: ticket.purchaseDate, 
        userId: ticket.userId,
        event: { title: "Evento no disponible", date: "No disponible", location: "No disponible" } 
      });
    }
  } catch (error) {
    console.error('Error in GET /:id:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mis Tickets (con detalles de evento)
app.get('/user/:userId', async (req, res) => {
  try {
    const tickets = await Ticket.findAll({ where: { userId: req.params.userId } });
    
    // Obtener detalles de cada evento desde el Events Service
    const ticketsWithDetails = await Promise.all(tickets.map(async (t) => {
      try {
        const eventRes = await axios.get(`${EVENTS_SERVICE_URL}/${t.eventId}`);
        return {
          id: t.id,
          purchaseDate: t.purchaseDate,
          event: eventRes.data
        };
      } catch (e) {
        return { id: t.id, purchaseDate: t.purchaseDate, event: { title: "Evento no disponible" } };
      }
    }));

    res.json(ticketsWithDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Ticket Service running on port ${PORT}`));
}).catch(err => console.error('Database connection failed:', err));
