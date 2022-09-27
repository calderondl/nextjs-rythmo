import { useEffect, useState } from 'react';
import { getTokenFromUrl, loginUrl } from '../services/spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';

const spotifyInstance = new SpotifyWebApi();

export default function Login() {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [athlete, setAthlete] = useState(null)

    useEffect(() => {
        const _token = getTokenFromUrl()
        if (_token) {
            window.location.hash = ''
            setToken(_token)
            console.log(_token)
            spotifyInstance.setAccessToken(_token)
            spotifyInstance.getMe().then(_user => {
                setUser(_user)
                console.log(_user)
                getAthlete(_user)
            })
        }
    }, []);

    async function getAthlete(_user) {
        await axios.post('api/getAthlete', {
            spotifyid: _user.id
        })
            .then(function (response) {
                const _athlete = response.data
                if (_athlete) {
                    setAthlete(_athlete)
                    addOnLine(_athlete)
                }
            })
    }

    async function addOnLine(_athlete) {
        await axios.post('api/addOnLine', {
            spotifyid: _athlete.id
        })
    }

    function logOff(_athlete) {
        if (_athlete) {
            removeOnLine(_athlete)
        }
        setToken(null)
        setUser(null)
        setAthlete(null)
    }

    async function removeOnLine(_athlete) {
        await axios.post('api/removeOnLine', {
            spotifyid: _athlete.id
        })
    }

    return (
        <div className='text-center'>
            <h1 className='text-bold text-3xl'>Sección especial para uso de los Atletas</h1>
            <div className='flex justify-center'>
                <p className='max-w-4xl text-justify p-2'>En está sección podrá conectarse al módulo de reproducción de El Gimnasio por medio del servicio de música de streaming "Spotify". De manera que, disrutará de su música favorita dentro de las instalaciones y podrá compartir sus gustos musicales con sus compañeros. Asimismo, tendrá la opción de registrar sus avances físicos como su retroalimentación sobre el servicio de música inteligente brindado por medio de los servicios de "Google Forms", con el objetivo de poder brindarle un mejor servicio.</p>
            </div>
            {
                !token ? (
                    <div className='mt-10'>
                        <a href={loginUrl} className='bg-green-500 rounded-full text-white font-bold p-4 hover:bg-green-600'>INICIAR SESIÓN CON SPOTIFY</a>
                        <p className='mt-5'>Leer todas las polisitcas de privacidad antes de aceptar los permisos correspondientes.</p>
                    </div>
                ) : (
                    <div className='flex justify-center'>
                        <div className='mt-6 p-2'>
                            <div className='flex rounded overflow-hidden shadow-2xl'>
                                <img className='w-44 max-h-full' src={user && user.images[0] ? user.images[0].url : null} alt='User path' />
                                <div className='w-96 overflow-x-auto relative whitespace-nowrap'>
                                    {
                                        !athlete ? (
                                            <>
                                                <h1 className='font-bold text-2xl mb-3 pt-1'>{user ? user.display_name : null}</h1>
                                                <p className='text-justify p-3 font-semibold'>Su usuario no está registrado en la base de datos de El Gimnasio. Por favor, acercarse a atención a cliente y solicitar que lo registren.</p>
                                            </>
                                        ) : (
                                            <>
                                                <h1 className='font-bold text-2xl mb-3 pt-1'>Bienvenido {athlete ? athlete.nombre + ' ' + athlete.apellido : null}</h1>
                                                <p className='text-left pl-3 font-semibold'>Correo: {athlete ? athlete.correo : null}</p>
                                                <p className='text-left pl-3 font-semibold'>Teléfono: {athlete ? athlete.telefono : null}</p>
                                                <p className='text-left pl-3 font-semibold'>Dirección: {athlete ? athlete.direccion : null}</p>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='mt-6'>
                                {
                                    athlete ? (
                                        <a href='' target='_blank' className='bg-blue-400 rounded-xl font-bold text-white p-4 mr-4 hover:bg-blue-600'>REGISTRAR AVANCE</a>
                                    ) : (
                                        null
                                    )
                                }
                                <button onClick={() => { logOff(athlete) }} className='bg-red-400 rounded-xl font-bold text-white p-4 hover:bg-red-600'>CERRAR SESIÓN</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}