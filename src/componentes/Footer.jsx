import '../estilos/Footer.css';

function Footer({nombrecompleto,año,curso}) {
    return (
        <>
            <footer>
                <span>{nombrecompleto}</span><br />
                <span>{año}{curso}</span>
            </footer>
        </>
    )
}
export default Footer;