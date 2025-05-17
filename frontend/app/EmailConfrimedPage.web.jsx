export default function EmailConfirmedWebPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#1D201F] p-10 text-white">
            <div className="bg-[#240046] rounded-2xl p-8 w-full max-w-xl shadow-lg">
                <h1 className="text-[#AF47E8] text-3xl font-bold mb-4 text-center">Email Confirmed</h1>
                <p className="text-base text-center">
                    Your email has been successfully confirmed. You can now return to the app and log in.
                </p>
            </div>
        </div>
    );
}
