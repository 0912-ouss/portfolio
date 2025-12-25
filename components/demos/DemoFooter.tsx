export function DemoFooter() {
    return (
        <footer className="bg-secondary/30 border-t border-border/50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm text-foreground/60 mb-2">
                        This is a demo website created by{" "}
                        <span className="font-semibold text-primary">Creative Developer</span>
                    </p>
                    <p className="text-xs text-foreground/40">
                        © 2024 Demo Website. For demonstration purposes only.
                    </p>
                </div>
            </div>
        </footer>
    );
}
