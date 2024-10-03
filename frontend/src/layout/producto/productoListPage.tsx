import ProductoList from "../../components/producto/productoList"
import NavBar from "@/components/navBar";

function ProductoListPage() {
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
                <ProductoList/>
            </main>
        </div>
    )

}

export default ProductoListPage;