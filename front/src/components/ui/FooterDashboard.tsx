export const FooterDashboard = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-[130px] pb-4 bg-white">
      <div className="w-full mt-12">
        <hr className="pt-6 border-gray-300" />
        <span className="block text-sm text-center text-text-secondary">
          © {currentYear}{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
