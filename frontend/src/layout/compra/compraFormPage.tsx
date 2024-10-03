import CompraForm from "@/components/compra/compraForm";
import NavBar from "@/components/navBar";

function ClienteFormPage() {
    const styles = {
        "mainDiv": "w-screen h-screen grid grid-rows-[auto_1fr] ",
        "pageBody": "flex justify-center items-center relative w-full grow ",
        "navBar": "w-full h-1/5"
    }

    return (
        <div className =  {styles.mainDiv}>
            <nav className={styles.navBar}>
                <NavBar/>
            </nav>
            <main className={styles.pageBody}>
                <CompraForm/>
            </main>
        </div>
    )

}

export default ClienteFormPage;