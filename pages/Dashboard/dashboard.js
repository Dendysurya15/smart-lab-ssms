// pages/Dashboard/dashboard.js
import DashboardLayout from '../../RootLayouts/DashboardLayout/dashboardLayout'; // Adjust the import path
import { checkTokenAndRedirect } from '../serverside'; // Adjust the import path

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Your dashboard content */}
    </DashboardLayout>
  );
}

export async function getServerSideProps({ req, res }) {
  await checkTokenAndRedirect({ req, res });
  return { props: {} };
}
