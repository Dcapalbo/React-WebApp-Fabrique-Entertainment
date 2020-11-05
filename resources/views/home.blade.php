@include('layouts.app')
{{-- start header --}}
@include('layouts.header')
{{-- hero --}}
<div class="hero">
    <video width="100%" autoplay> 
     <source src="{{asset('/video/Fabrique_E_Logo_Animato.mp4')}}">
     Your browser does not support the video tag.
    </video>
</div>
{{-- end hero --}}
{{-- end header --}}
{{-- start main --}}
    <main>
    <h2>Last Projects</h2>
    {{-- main wrapper --}}
     <div class="main_wrapper">
      {{-- films card --}}
      <div class="films_card">
        <div class="films_informations">
            <h3>Lucania</h3>
            <h4>Directeby by Gigi Roccati</h4>
            <h4>Produced by Fabrique Entertainment</h4>
            <h4>Synopsis</p>
            <h5>An ancient dying land is brought back to life by the primal force of a young mute girl, who witnesses the fatal clash between two fathers.</h5>
        </div>
        <div class="cover">
            <img src="{{asset('/img/lucania/COVER_LUCANIA.jpg')}}" alt="Cover Lucania">
        </div>
      </div>
      <div class="films_card">
        <div class="films_informations">
            <h3>Love and Desire</h3>
            <h4>Directed by Domenico Capalbo</h4>
            <h4>Produced by Fabrique Entertainment</h4>
            <h4>Synopsis</h4>
            <h5>A young painter who is living with his ailing father is in search of artistic success. However, while being continuously turned down by art dealers, their relationship becomes jeopardized.</h5>
        </div>
        <div class="cover">
            <img src="{{asset('/img/lad/COVER AED FOR SITE FABRIQUE.jpg')}}" alt="Cover Love and Desire">
        </div>
      </div>
       <div class="films_card">  
         <div class="films_informations">
            <h3>Nightlife</h3>
            <h4>Directed by Joseph Lefevre</h4>
            <h4>Produced by Fabrique Entertainment</h4>
            <h4>Synopsis</h4>
            <h5>A journey of a cultural operator, to discover the contradictions and differences between Roman and Berliner nightlife.</h5>
         </div>  
         <div class="cover">
            <img src="{{asset('/img/nightlife/COVER NIGHTLIFE 2018.jpg')}}" alt="Cover Nightlife">
         </div>
       </div>
       <div class="films_card">
         <div class="films_informations">
            <h3>Guerrieri</h3>
            <h4>Directed by Fabio Segatori</h4>
            <h4>Produced by Fabrique Entertainment & Baby Films</h4>
            <h4>Synopsis</h4>
            <h5>An observational journey in search of the forgotten figure of Gerardo Guerrieri, great intellectual, writer, scriptwriter and translator, who crossed the world of theater and cinema from the 60s to the late 80s in Italy. An introverted, reserved and kind man.</h5>
         </div> 
         <div class="cover">
            <img src="{{asset('/img/guerrieri/COVER GUERRIERI.jpg')}}" alt="Cover Lucania">
         </div>  
       </div>
      {{-- end films card --}}
     </div>
     {{-- end main wrapper --}}
    </main>
{{-- end main --}}