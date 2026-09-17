import { redirect } from "next/navigation";

// Vehicles were merged into the Equipment page (type = "Vehicle"). This route is
// kept only to redirect any old links; there is no standalone Vehicles page.
export const dynamic = "force-dynamic";
export default function MmrpgVehiclesRedirect() {
  redirect("/mmrpg/equipment?type=Vehicle");
}
