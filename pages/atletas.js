import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import AddAthlete from '../components/AddAthlete';
import EditAthlete from '../components/EditAthlete';
import Atletas from '../components/Atletas';
import { useRouter } from 'next/router';


const prisma = new PrismaClient()

export default function atletas(props) {    
    const athletes = props.athletes    
    // const [disable, setDisable] = useState(false)
    // const [logged, setLogged] = useState(false)
    // const [errorLogged, setErrorLogged] = useState(null)
    // const [showAddAthleteModal, setShowAddAthleteModal] = useState(false)
    // const [showEditAthleteModal, setShowEditthleteModal] = useState(false)
    // const [currentAthlete, setCurrentAthlete] = useState(null)    
    // const router = useRouter()
    // const formRef = useRef()

    //     function editTrigger(athlete) {
    //         setCurrentAthlete(athlete)
    //         setShowEditthleteModal((value) => !value)
    //     }

    //     async function deleteAthelte(athlete) {
    //         if (window.confirm('¿Está seguro que desea eliminar este atleta?')) {
    //             await axios.post('api/deleteAthlete', { id: athlete.id })
    //             router.replace(router.asPath)
    //         }
    //     }

    //     async function getAdmin(params) {
    //         setDisable(true)
    //         const {
    //             adminUser,
    //             adminPassword
    //         } = formRef.current
    //         const user = adminUser.value
    //         const password = adminPassword.value
    //         await axios.post('api/getAdmin', {
    //             user: user,
    //             password: password
    //         })
    //             .then(function (response) {
    //                 const _admin = response.data
    //                 if (_admin) {
    //                     setLogged(true)
    //                 }
    //                 else {
    //                     setErrorLogged('Error al iniciar sesión. Por favor, verificar la información.')
    //                 }
    //             })
    //         setDisable(false)
    //     }

    //     return (
    //         <>
    //             {logged ? (
    //                 <>
    //                     <h1 className='text-3xl text-center'>Mantenimiento de Atletas</h1>
    //                     <button onClick={() => setShowAddAthleteModal((value) => !value)} className='bg-blue-400 hover:bg-blue-600 rounded-xl p-3 mb-1 text-white  font-bold'>Agregar nuevo</button>
    //                     <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
    //                         <table className='w-full text-sm text-left text-gray-500'>
    //                             <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
    //                                 <tr>
    //                                     <th scope='col' className='py-3 px-6'>
    //                                         <span className='sr-only'>No.</span>
    //                                     </th>
    //                                     <th scope='col' className='py-3 px-6'>
    //                                         Nombre
    //                                     </th>
    //                                     <th scope='col' className='py-3 px-6'>
    //                                         Apellido
    //                                     </th>
    //                                     <th scope='col' className='py-3 px-6'>
    //                                         Correo
    //                                     </th>
    //                                     <th scope='col' className='py-3 px-6'>
    //                                         Teléfono
    //                                     </th>
    //                                     <th scope='col' className='py-3 px-6'>
    //                                         Dirección
    //                                     </th>
    //                                     <th scope='col' className='py-3 px-6'>
    //                                         Spotify ID
    //                                     </th>
    //                                     <th scope='col' className='py-3 px-6'>
    //                                         <span className='sr-only'>Edit</span>
    //                                     </th>
    //                                     <th scope='col' className='py-3 px-6'>
    //                                         <span className='sr-only'>Eliminar</span>
    //                                     </th>
    //                                 </tr>
    //                             </thead>
    //                             <tbody>
    //                                 {athletes?.map((athlete, i) => (
    //                                     <tr className='bg-white border-b hover:bg-gray-50' key={athlete.id}>
    //                                         <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
    //                                             {i + 1}
    //                                         </th>
    //                                         <td className='py-4 px-6'>
    //                                             {athlete.nombre}
    //                                         </td>
    //                                         <td className='py-4 px-6'>
    //                                             {athlete.apellido}
    //                                         </td>
    //                                         <td className='py-4 px-6'>
    //                                             {athlete.correo}
    //                                         </td>
    //                                         <td className='py-4 px-6'>
    //                                             {athlete.telefono}
    //                                         </td>
    //                                         <td className='py-4 px-6'>
    //                                             {athlete.direccion}
    //                                         </td>
    //                                         <td className='py-4 px-6'>
    //                                             {athlete.spotifyid}
    //                                         </td>
    //                                         <td className='py-4 px-6 text-right'>
    //                                             <button onClick={() => editTrigger(athlete)} className='font-medium text-blue-600 hover:underline'>Editar</button>
    //                                         </td>
    //                                         <td className='py-4 px-6 text-right'>
    //                                             <button onClick={() => deleteAthelte(athlete)} className='font-medium text-red-600 hover:underline'>Eliminar</button>
    //                                         </td>
    //                                     </tr>
    //                                 ))}
    //                             </tbody>
    //                         </table>
    //                     </div>
    //                     {showAddAthleteModal ? (
    //                         <AddAthlete closeModal={() => setShowAddAthleteModal(false)} />
    //                     ) : null}
    //                     {showEditAthleteModal ? (
    //                         <EditAthlete closeModal={() => setShowEditthleteModal(false)} athlete={currentAthlete} />
    //                     ) : null}
    //                 </>
    //             ) : (
    //                 <>
    //                     <h1 className='text-3xl text-center'>Sección especial para la administración del El Gimansio.</h1>
    //                     <div className='flex justify-center mt-3'>
    //                     <div className='w-1/4'>
    //                         <p className='text-red-400 font-bold'>{errorLogged ? errorLogged : null}</p>
    //                         <form className='space-y-3' ref={formRef}>
    //                             <div>
    //                                 <label htmlFor='adminUser' className='font-semibold'>Usuario</label>
    //                                 <input type='text' name='adminUser' placeholder='admin' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
    //                             </div>
    //                             <div>
    //                                 <label htmlFor='adminPassword' className='font-semibold'>Clave</label>
    //                                 <input type='password' name='adminPassword' placeholder='admin' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
    //                             </div>
    //                             <div className='flex justify-end'>
    //                                 <button type='button' onClick={() => getAdmin()} disabled={disable} className='bg-blue-300 hover:bg-blue-600 rounded-xl p-3 font-bold text-white'>
    //                                     Ingresar
    //                                 </button>
    //                             </div>
    //                         </form>
    //                     </div>
    //                     </div>                    
    //                 </>
    //             )}
    //         </>
    //     );

    return (
        <Atletas />
    );
}

export async function getServerSideProps() {
    try {
        const allAthletes = await prisma.athlete.findMany()
        return {
            props: {
                athletes: allAthletes
            }
        }
    } catch (e) {
        console.error(e)
    }

}