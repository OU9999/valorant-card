const SiteBackground = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#101923]"
  >
    <div className="site-bg-radtech pointer-events-none absolute -top-8 -right-8 h-[630px] w-[570px]" />
    <div className="site-bg-radtech pointer-events-none absolute -top-8 -left-8 h-[570px] w-[630px] -scale-x-100" />
    <div className="site-bg-radtech pointer-events-none absolute -right-8 -bottom-8 h-[570px] w-[630px] -scale-y-100" />
    <div className="site-bg-radtech pointer-events-none absolute -bottom-8 -left-8 h-[630px] w-[570px] -scale-x-100 -scale-y-100" />
  </div>
);

export { SiteBackground };
