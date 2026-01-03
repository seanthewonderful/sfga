export default function Footer() {
    return (
        <footer className="flex flex-col gap-4 bg-green-900 py-6 px-6 text-center text-sm text-white">
            <div className="flex justify-center gap-4">
                <a href="#" className="hover:underline hover:text-yellow-400">Privacy</a> • <a href="#" className="hover:underline hover:text-yellow-400">Terms</a>
                © 2025 Sean Fagan Golf Academy
            </div>
            <div className="flex justify-center gap-4">
                <a
                    href="https://www.flaticon.com/free-icons/golf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="lessons icons"
                    className="text-xs text-white"
                >
                    Lesson icon by Shital777, Swing icon by bsd - Flaticon
                </a>
            </div>
        </footer>
    );
}

