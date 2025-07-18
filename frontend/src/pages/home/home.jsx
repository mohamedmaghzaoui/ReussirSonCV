export const Home=()=>{
    return (<div>

 <div className="mt-5 w-full grid grid-cols-1 lg:grid-cols-2 items-center px-6 py-10 gap-10">
  
  <div className="text-center lg:text-left">
    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
      Créez votre CV avec <span className="text-primary block">ReussirSonCv</span>
    </h1>
    <p className="mt-5 text-info-content font-semibold">It will take a couple of minutes. 
    <span className="block">Change profile settings and confirm with SMS code</span>
</p>
<button className="btn btn-neutral mt-2">Get started</button>
  </div>

  <div>
    <img
      src="/site_img.jpg"
      alt="site preview"
      className="w-full max-w-xl h-auto mx-auto"
    />
  </div>
  
</div>

<section className="px-6 py-10 mb-10">
  <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
    Pourquoi Nous
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
    <div className="card bg-purple-50 shadow-md p-6 rounded-box text-center">
      <h2 className="text-xl font-bold mb-2">Rapide</h2>
      <p>Créez votre CV en quelques minutes.</p>
    </div>

    <div className="card bg-purple-50 shadow-md p-6 rounded-box text-center">
      <h2 className="text-xl font-bold mb-2">Personnalisé</h2>
      <p>Adaptez le style à votre profil.</p>
    </div>

    <div className="card bg-purple-50 shadow-md p-6 rounded-box text-center">
      <h2 className="text-xl font-bold mb-2">Gratuit</h2>
      <p>100% gratuit, sans engagement.</p>
    </div>

  </div>
</section>
    </div>)
}