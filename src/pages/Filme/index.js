import './filme-info.css';
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api';

export default function Filme() {


   const { id } = useParams()
   const navigate = useNavigate()
   const [filme, setFilme] = useState({})
   const [loading, setLoading] = useState(true)

   useEffect(() => {

      async function loadFilmes(){
         await api.get(`/movie/${id}`, {
            params: {
               api_key: process.env.REACT_APP_KEY,
               language: "pt-BR",
            }
         })
            .then((response) => {
               setFilme(response.data);
               setLoading(false);
            })
            .catch(() => {
               console.log("Filme não encontrado")
               navigate("/", {replace: true})
               return
            })
      }

      loadFilmes();

      return () => {
         console.log('component foi desmontado')
      }
   },[navigate, id])


   function salvarFilme(){
      const minhaLista =  localStorage.getItem(process.env.REACT_APP_CHAVE);

      let filmesSalvo = JSON.parse(minhaLista) || [];
      const hasFilme = filmesSalvo.some((filmeS) => filmeS.id === filme.id )

      if(hasFilme){
         alert("esse filme já esta na lista")
      }

      filmesSalvo.push(filme);
      localStorage.setItem(process.env.REACT_APP_CHAVE, JSON.stringify(filmesSalvo))
      alert("Filme salvo com sucesso")
   }


   if (loading) {
      return (
         <div className="filme-info">
            <h1>Carregando detalhes...</h1>
         </div>
      )
   }

   return (
      
      <div className="filme-info">
         <h1>{filme.title}</h1>
         <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

         <h3>Sinopse</h3>
         <span>{filme.overview}</span>

         <strong>Avaliação: {filme.vote_average}/10 </strong>

         <div className='area-buttons'>
            <button onClick={salvarFilme}>Salvar</button>
            <button><a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a></button>
         </div>

      </div>




   )
}