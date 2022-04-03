import { useContext } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  })

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <Can permissions={['users.list']} >
        <div>Users List</div>
      </Can>

      {userCanSeeMetrics && <div>Métricas</div>}

      <button type="button" onClick={signOut}  >Sair</button>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  return {
    props: {}
  }
});