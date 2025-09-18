-- Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des lignes de métro
CREATE TABLE IF NOT EXISTS lines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Création de la table des stations
CREATE TABLE IF NOT EXISTS stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    line_id INT REFERENCES lines(id) ON DELETE CASCADE
);

-- Création de la table des horaires
CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    station_id INT REFERENCES stations(id) ON DELETE CASCADE,
    departure_time TIME NOT NULL,
    destination VARCHAR(100) NOT NULL
);