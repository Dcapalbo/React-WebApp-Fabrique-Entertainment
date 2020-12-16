@include('layouts.app')
@include('layouts.header')
{{-- hero --}}
<div class="hero">
    <video width="100%" autoplay> 
     <source src="{{asset('/video/Fabrique_E_Logo_Animato.mp4')}}">
     Your browser does not support the video tag.
    </video>
</div>
{{-- end hero --}}
    <main>
{{-- start main --}}
{{-- start first main section --}}
     <section>
        <div class="voices_container">
            <h2 class="about_voice"><a href="{{route('about')}}">About us</a></h2>
            <h5>Fabrique Entertainment è una società di produzione cinematografica indipendente fondata a Roma nel 2014.
                Il suo sguardo artistico produttivo si colloca nel cinema d’autore nazionale ed internazionale.
                Il team è composto da Giovanni Capalbo, Renata Di Leone e Domenico Capalbo.
                Fabrique Entertainment is an independent film production company founded in Rome in 2014. 
                Its vision moves around national and international author's cinema.
                The team is formed by Giovanni Capalbo, Renata Di Leone and Domenico Capalbo.</h5>
            <h2 class="projects_voice"><a href="{{route('projects')}}">Projects</a></h2>
        </div>
     </section>
{{-- end first main section --}}
     <section>
        {{-- second section  --}}
        {{-- main wrapper --}}
        <div class="main_wrapper">
        {{-- films card --}}
        <div class="films_card">
            {{-- films informations  --}}
            <div class="films_informations">
                <h3>Lucania</h3>
                <h4>Directeby by Gigi Roccati</h4>
                <h4>Produced by Fabrique Entertainment</h4>
                <h4>Synopsis</p>    
                <h4>An ancient dying land is brought back to life by the primal force of a young mute girl, who witnesses the fatal clash between two fathers.</h4>
            </div>
            {{-- film cover --}}
            <div class="cover">
                <img src="{{asset('/img/lucania/COVER_LUCANIA.jpg')}}" alt="Cover Lucania">
            </div>
        </div>
        <div class="films_card">
            {{-- films informations  --}}
            <div class="films_informations">
                <h3>Love and Desire</h3>
                <h4>Directed by Domenico Capalbo</h4>
                <h4>Produced by Fabrique Entertainment</h4>
                <h4>Synopsis</h4>
                <h4>A young painter who is living with his ailing father is in search of artistic success. However, while being continuously turned down by art dealers, their relationship becomes jeopardized.</h4>
            </div>
            {{-- film cover --}}
            <div class="cover">
                <img src="{{asset('/img/lad/COVER AED FOR SITE FABRIQUE.jpg')}}" alt="Cover Love and Desire">
            </div>
        </div>
        <div class="films_card"> 
            {{-- films informations  --}} 
            <div class="films_informations">
                <h3>Nightlife</h3>
                <h4>Directed by Joseph Lefevre</h4>
                <h4>Produced by Fabrique Entertainment</h4>
                <h4>Synopsis</h4>
                <h4>A journey of a cultural operator, to discover the contradictions and differences between Roman and Berliner nightlife.</h4>
            </div>  
            {{-- film cover --}}
            <div class="cover">
                <img src="{{asset('/img/nightlife/COVER NIGHTLIFE 2018.jpg')}}" alt="Cover Nightlife">
            </div>
        </div>
        <div class="films_card">
            {{-- films informations  --}}
            <div class="films_informations">
                <h3>Guerrieri</h3>
                <h4>Directed by Fabio Segatori</h4>
                <h4>Produced by Fabrique Entertainment & Baby Films</h4>
                <h4>Synopsis</h4>
                <h4>An observational journey in search of the forgotten figure of Gerardo Guerrieri, great intellectual, writer, scriptwriter and translator, who crossed the world of theater and cinema from the 60s to the late 80s in Italy. An introverted, reserved and kind man.</h4>
            </div> 
            {{-- film cover --}}
            <div class="cover">
                <img src="{{asset('/img/guerrieri/COVER GUERRIERI.jpg')}}" alt="Cover Lucania">
            </div>  
        </div>
        {{-- end films card --}}
        </div>
        {{-- end main wrapper --}}
     </section>
    {{-- end second section --}}
    </main>
{{-- end main --}}