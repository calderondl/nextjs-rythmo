import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';
import AddAthlete from '../components/AddAthlete';
import EditAthlete from '../components/EditAthlete';
import { useRouter } from 'next/router';


const prisma = new PrismaClient()

export default function atletas(props) {
    const [showAddAthleteModal, setShowAddAthleteModal] = useState(false)
    const [showEditAthleteModal, setShowEditthleteModal] = useState(false)
    const [currentAthlete, setCurrentAthlete] = useState(null)
    const athletes = props.athletes
    const router = useRouter()
    
    function editTrigger(athlete){
        setCurrentAthlete(athlete)
        setShowEditthleteModal((value) => !value)
    }

    async function deleteAthelte(athlete){
        if(window.confirm("¿Está seguro que desea eliminar este atleta?")){
            await axios.post('api/deleteAthlete',{id: athlete.id})
            router.replace(router.asPath)
        }
    }

    return (
        <>
            <h1 className='text-3xl text-center'>Mantenimiento de Atletas</h1>
            <button onClick={() => setShowAddAthleteModal((value) => !value)} className='bg-blue-400 hover:bg-blue-600 rounded-xl p-3 mb-1 text-white  font-bold'>Agregar nuevo</button>
            <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
                <table className='w-full text-sm text-left text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='py-3 px-6'>
                                <span className='sr-only'>No.</span>
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Nombre
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Apellido
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Correo
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Teléfono
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Dirección
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                Spotify ID
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                <span className='sr-only'>Edit</span>
                            </th>
                            <th scope='col' className='py-3 px-6'>
                                <span className='sr-only'>Eliminar</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {athletes?.map((athlete, i) => (
                            <tr className='bg-white border-b hover:bg-gray-50' key={athlete.id}>
                                <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {i + 1}
                                </th>
                                <td className='py-4 px-6'>
                                    {athlete.nombre}
                                </td>
                                <td className='py-4 px-6'>
                                    {athlete.apellido}
                                </td>
                                <td className='py-4 px-6'>
                                    {athlete.correo}
                                </td>
                                <td className='py-4 px-6'>
                                    {athlete.telefono}
                                </td>
                                <td className='py-4 px-6'>
                                    {athlete.direccion}
                                </td>
                                <td className='py-4 px-6'>
                                    {athlete.spotifyid}
                                </td>
                                <td className='py-4 px-6 text-right'>
                                    <button onClick={() => editTrigger(athlete) } className='font-medium text-blue-600 hover:underline'>Edit</button>
                                </td>
                                <td className='py-4 px-6 text-right'>
                                    <button onClick={() => deleteAthelte(athlete)} className='font-medium text-red-600 hover:underline'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showAddAthleteModal ? (
                <AddAthlete closeModal={() => setShowAddAthleteModal(false)} />
            ) : null}
            {showEditAthleteModal ? (
                <EditAthlete closeModal={() => setShowEditthleteModal(false)} athlete={currentAthlete} />
            ) : null}
        </>
    );
}

export async function getServerSideProps() {
    const allAthletes = await prisma.athlete.findMany()
    return {
        props: {
            athletes: allAthletes
        }
    }
}