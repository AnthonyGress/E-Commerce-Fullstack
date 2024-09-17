export const Footer = () => {
    const date = new Date();

    return (
        <footer className="w-full flex items-center justify-center py-3">

            <span className="text-neutral-500">{`© ${date.getFullYear()} Anthony Gress`}</span>
        </footer>
    );
};
