import axios from 'axios'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function AddFodd({ closeModal }) {
    const [disable, setDisable] = useState(false)
    const formRef = useRef()
    const router = useRouter()

    async function addNewAthlete(params) {
        setDisable(true)
        const {
            addNombre,
            addApellido,
            addCorreo,
            addTelefono,
            addDireccion,
            addSpotifyId,
        } = formRef.current
        const nombre = addNombre.value
        const apellido = addApellido.value
        const correo = addCorreo.value
        const telefono = addTelefono.value
        const direccion = addDireccion.value
        const spotifyId = addSpotifyId.value
        await axios.post('api/addAthlete', {
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
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden flex justify-center items-center bg-gradient-to-b from-transparent to-neutral-300'>
            <div className='bg-white w-2/5 rounded-lg shadow-lg p-4 space-y-4'>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-bold'>Nuevo Atleta</h1>  
                    <div className='items-center text-2xl'>
                    <button onClick={() => closeModal()} className='hover:bg-gray-200 rounded pl-2 pr-2 pt-1 pb-1 font-semibold font-mono'>x</button>
                    </div>                                      
                </div>
                <div>
                    <form className='space-y-3' ref={formRef}>
                        <div>
                            <label htmlFor='addNombre' className='font-semibold'>Nombre</label>
                            <input type='text' name='addNombre' placeholder='Diego' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div>
                            <label htmlFor='addApellido' className='font-semibold'>Apellido</label>
                            <input type='text' name='addApellido' placeholder='Velázquez' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div>
                            <label htmlFor='addCorreo' className='font-semibold'>Correo</label>
                            <input type='email' name='addCorreo' placeholder='ejemplo@gmail.com' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div>
                            <label htmlFor='addTelefono' className='font-semibold'>Teléfono</label>
                            <input type='number' name='addTelefono' placeholder='12345678' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div>
                            <label htmlFor='addDireccion' className='font-semibold'>Dirección</label>
                            <input type='text' name='addDireccion' placeholder='Ciudad' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div>
                            <label htmlFor='addSpotifyId' className='font-semibold'>Spotify ID</label>
                            <input type='text' name='addSpotifyId' placeholder='121250891EJ' className='bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block w-full p-2.5'></input>
                        </div>
                        <div className='flex justify-end'>
                            <button type='button' onClick={() => addNewAthlete()} disabled={disable} className='bg-blue-300 hover:bg-blue-600 rounded-xl p-2 font-bold text-white'>
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}