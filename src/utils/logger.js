const logs = [];

export const logEvent = (type, message, meta = {}) => {
  logs.push({ type, message, timestamp: new Date().toISOString(), ...meta });
};

export const getLogs = () => logs;
