// ══ The Walking Dead plug-in ═══════════════════════════════════════════════
// Found vehicles: the Vehicle Condition table (Core Rules p. 75) — a D6 for its state
// and a second D6 for the fuel — added to the newest vehicle's notes. Threat Level and
// Swarm Size are boxes on each encounter (registry EXTRA.TWD); havens are a section.
const TWD_VCOND = [['Broken and cannot be fixed', 'Empty'], ['Broken and in need of extensive repairs', 'Empty'], ['Broken and in need of repairs', 'Empty'],
  ['Functional but breaks down after driving D6 sectors if not repaired', 'Fumes'], ['Functional but breaks down after driving D6 days if not repaired', 'Half full'], ['Functional', 'Full tank']];
function twdVehicleCondition(){
  const a = 1 + Math.floor(Math.random() * 6), b = 1 + Math.floor(Math.random() * 6);
  const line = 'Condition D6 ' + a + ': ' + TWD_VCOND[a - 1][0] + ' · Fuel D6 ' + b + ': ' + TWD_VCOND[b - 1][1];
  let card = [...document.querySelectorAll('#vehicles-list > .vehicle-card')].pop();
  if(!card) card = addVehicle({ role: 'other', name: 'Found vehicle' });
  _appendLine(card.querySelector('.vh-notes'), line);
}
