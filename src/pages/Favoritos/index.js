import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './favoritos.css';
import { toast } from "react-toastify";

export default function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem(process.env.REACT_APP_CHAVE);
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem(process.env.REACT_APP_CHAVE, JSON.stringify(filtroFilmes))
        toast.success("filme removido com sucesso")
    }

    return (
        <div className="meus-filmes">
            <h1>Minha Lista</h1>

{filmes.length === 0 && <span>Você não possui nenhum filme salvo </span>}


            <ul>
                {
                    filmes.map((item) => {
                           return(
                            <li key={item.id}>
                                <span>{item.title}</span>

                                <div>
                                    < Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                    <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                                </div>
                            </li>
                           ) 
                    })
                }
            </ul>

        </div>
    )
}