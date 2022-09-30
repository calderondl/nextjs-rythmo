import axios from 'axios'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function AddFodd({ closeModal, athlete}) {
    const [disable, setDisable] = useState(false)
    const formRef = useRef()
    const router = useRouter()        

    async function editNewAthlete(params) {
        setDisable(true)
        const {
            editNombre,
            editApellido,
            editCorreo,
            editTelefono,
            editDireccion,
            editSpotifyId,
        } = formRef.current
        const nombre = editNombre.value
        const apellido = editApellido.value
        const correo = editCorreo.value
        const telefono = editTelefono.value
        const direccion = editDireccion.value
        const spotifyId = editSpotifyId.value
        await axios.post('api/editAthlete', {
            id: athlete?.id,
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            spotifyId
        })
        setDisable(false)
        closeModal()
        router.replace(router.asPath)
    }


    return (
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gradient-to-b from-transparent to-neutral-300'>
            <div className='bg-white w-2/5 rounded-lg shadow-lg p-4 space-y-4'>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-bold'>Editar Atleta</h1>  
                    <div className='items-center text-2xl'>
                    <button onClick={() => closeModal()} className='hover:bg-gray-200 rounded pl-2 pr-2 pt-1 pb-1 font-semibold font-mono'>x</button>
                    </div>                                      
                </div>
                <div>
                    <form className='space-y-3' ref={formRef}>
                        <div>
                            <label htmlFor='editNombre' className='font-semibold'>Nombre</label>
                            <input type='text' name='editNombre' defaultValue={athlete?.nombre} placeholder='Diego' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div>
                            <label htmlFor='editApellido' className='font-semibold'>Apellido</label>
                            <input type='text' name='editApellido' defaultValue={athlete?.apellido} placeholder='Velázquez' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div>
                            <label htmlFor='editCorreo' className='font-semibold'>Correo</label>
                            <input type='email' name='editCorreo' defaultValue={athlete?.correo} placeholder='ejemplo@gmail.com' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div>
                            <label htmlFor='editTelefono' className='font-semibold'>Teléfono</label>
                            <input type='number' name='editTelefono' defaultValue={athlete?.telefono} placeholder='12345678' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div>
                            <label htmlFor='editDireccion' className='font-semibold'>Dirección</label>
                            <input type='text' name='editDireccion' defaultValue={athlete?.direccion} placeholder='Ciudad' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div>
                            <label htmlFor='editSpotifyId' className='font-semibold'>Spotify ID</label>
                            <input type='text' name='editSpotifyId' defaultValue={athlete?.spotifyid} placeholder='121250891EJ' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div className='flex justify-end'>
                            <button type='button' onClick={() => editNewAthlete()} disabled={disable} className='bg-blue-300 hover:bg-blue-600 rounded-xl p-2 font-bold text-white'>
                                Editar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}