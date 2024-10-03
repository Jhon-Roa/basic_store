import CompraList from "@/components/compra/compraList"
import NavBar from "@/components/navBar";

function CompraListPage() {
    const styles = {
        "mainDiv": "w-screen h-screen grid grid-rows-[auto_1fr] ",
        "pageBody": "flex justify-center items-center relative w-full md:px-12 grow ",
        "navBar": "w-full h-1/5"
    }

    return (
        <div className =  {styles.mainDiv}>
            <nav className={styles.navBar}>
                <NavBar/>
            </nav>
            <main className={styles.pageBody}>
                <CompraList/>
            </main>
        </div>
    )

}

export default CompraListPage;