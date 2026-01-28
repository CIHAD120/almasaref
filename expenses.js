/* CRUD Logic (stub) */
export const expensesController = {
  async list(){ return []; },
  async add(item){ return item; },
  async update(id, patch){ return {id, ...patch}; },
  async remove(id){ return true; }
};
