/* Main Entry Point */
import { db } from './core/db.js';
import { router } from './core/router.js';

(async function main(){
  await db.init();
  router.guard();
})();
