-- Migration number: 0001        2025-04-03T16:32:00.000Z
-- URBOP Data Hub Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS coordinates;
DROP TABLE IF EXISTS municipal_population;
DROP TABLE IF EXISTS municipalities;
DROP TABLE IF EXISTS states;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS continents;
DROP TABLE IF EXISTS parameters;
DROP TABLE IF EXISTS parameter_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS asset_classes;
DROP TABLE IF EXISTS access_logs;

-- Geographic Tables
CREATE TABLE continents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT
);

CREATE TABLE countries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  continent_id TEXT NOT NULL,
  capital_city TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT,
  FOREIGN KEY (continent_id) REFERENCES continents(id)
);

CREATE TABLE states (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country_id TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT,
  FOREIGN KEY (country_id) REFERENCES countries(id)
);

CREATE TABLE municipalities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  state_id TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT,
  FOREIGN KEY (state_id) REFERENCES states(id)
);

CREATE TABLE coordinates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  municipality_id TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT,
  FOREIGN KEY (municipality_id) REFERENCES municipalities(id)
);

-- Parameter Tables
CREATE TABLE parameter_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT
);

CREATE TABLE parameters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  category_id INTEGER NOT NULL,
  data_type TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT,
  FOREIGN KEY (category_id) REFERENCES parameter_categories(id)
);

-- Project Tables
CREATE TABLE clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT
);

CREATE TABLE asset_classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT
);

CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  client_id INTEGER NOT NULL,
  asset_class_id INTEGER,
  country_id TEXT,
  state_id TEXT,
  municipality_id TEXT,
  description TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (asset_class_id) REFERENCES asset_classes(id),
  FOREIGN KEY (country_id) REFERENCES countries(id),
  FOREIGN KEY (state_id) REFERENCES states(id),
  FOREIGN KEY (municipality_id) REFERENCES municipalities(id)
);

-- Municipal Population Data
CREATE TABLE municipal_population (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  municipality_id TEXT NOT NULL,
  parameter_id INTEGER NOT NULL,
  value REAL NOT NULL,
  data_date DATE NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT,
  FOREIGN KEY (municipality_id) REFERENCES municipalities(id),
  FOREIGN KEY (parameter_id) REFERENCES parameters(id)
);

-- Access Logs
CREATE TABLE access_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT,
  path TEXT,
  user_agent TEXT,
  accessed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes
CREATE INDEX idx_coordinates_municipality ON coordinates(municipality_id);
CREATE INDEX idx_coordinates_lat_long ON coordinates(latitude, longitude);
CREATE INDEX idx_parameters_category ON parameters(category_id);
CREATE INDEX idx_projects_location ON projects(country_id, state_id, municipality_id);
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_asset_class ON projects(asset_class_id);
CREATE INDEX idx_municipal_population_municipality ON municipal_population(municipality_id);
CREATE INDEX idx_municipal_population_parameter ON municipal_population(parameter_id);
CREATE INDEX idx_municipal_population_date ON municipal_population(data_date);
CREATE INDEX idx_access_logs_accessed_at ON access_logs(accessed_at);

-- Initial Data
INSERT INTO parameter_categories (name, description) VALUES 
  ('Geographic', 'Geographic and location parameters'),
  ('Demographic', 'Population and demographic parameters'),
  ('Economic', 'Economic indicators and parameters'),
  ('Infrastructure', 'Infrastructure and services parameters'),
  ('Environmental', 'Environmental and sustainability parameters');

INSERT INTO asset_classes (name, description) VALUES
  ('Residential', 'Residential real estate properties'),
  ('Commercial', 'Commercial real estate properties'),
  ('Industrial', 'Industrial real estate properties'),
  ('Mixed-Use', 'Mixed-use real estate properties'),
  ('Land', 'Undeveloped land');
