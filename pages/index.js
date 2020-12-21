import Layout from '../components/Layout';
import Cliente from '../components/Cliente';
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link'

const OBTENER_CLIENTES_USUARIO = gql`
	query obtenerClientesVendedor {
		obtenerClientesVendedor {
			id
			nombre
			apellido
			empresa
			email
		}
	}
`;

const Index = () => {

	const router = useRouter();

	// Consulta de Apollo
	const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);


	if (loading) return 'Cargando....';

	if (!data.obtenerClientesVendedor) {
		return router.push('/login');
	}

	return (
		<div>
			<Layout>
				<h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
				<Link href="/nuevocliente">
					<a className="bg-green-600 px-4 py-1 text-white text-xs rounded hover:bg-green-700 inline-block mt-5">Nuevo Cliente</a>
				</Link>

				<div className="overflow-x-scroll">
					<table className="table-auto shadow-md mt-10 w-full w-lg">
						<thead className="bg-gray-800">
							<tr className="text-white">
								<th className="w-1/5 py-2">Nombre</th>
								<th className="w-1/5 py-2">Empresa</th>
								<th className="w-1/5 py-2">Email</th>
								<th className="w-1/5 py-2">Eliminar</th>
								<th className="w-1/5 py-2">Editar</th>
							</tr>
						</thead>

						<tbody className="bg-white">
							{data.obtenerClientesVendedor.map(cliente => (
								<Cliente
									key={cliente.id}
									cliente={cliente}
								/>
							))}
						</tbody>
					</table>
				</div>
			</Layout>
		</div>
	)
}

export default Index
