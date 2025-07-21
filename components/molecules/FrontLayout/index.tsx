// components/layouts/FrontLayout.tsx
import Header from "../Header";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";

export default function FrontLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
        </>
    );
}
