<header>
 {{-- header top  --}}
 <div class="header_top">
  {{-- header wrapper --}}
  <div class="header_wrapper">
  {{-- logo fabrique --}}
   <div class="logo_fabrique">
    <a href='{{route('home')}}'><img src="{{asset('/img/fabrique/LOGO_Fabrique_Entertainment_White.png')}}" alt="logo_fabrique_entertainment"></a>
   </div>
   {{-- logo fabrique --}}
   {{-- navbar --}}
   <nav class="header_nav">
        <li class="list_item"><a href='{{route('home')}}'>Home</a></li>
        <li class="list_item"><a href='{{route('about')}}'>About</a></li>
        <li class="list_item relative"><a href='{{route('projects')}}'>Projects</a></li>
        {{-- dropdown projects menu --}}
            <ul class="dropdown_menu">
                <li class="list_item">Lucania</li>
                <li class="list_item">Love and Desire</li>
                <li class="list_item">Nightlife</li>
                <li class="list_item">Guerrieri</li>
            </ul>
        {{-- end dropdown menu --}}
        <li><a href='{{route('news')}}'>News</a></li>
        <li><a href='{{route('contacts')}}'>Contacts</a></li>
   </nav>
   {{-- end navbar --}}
  </div>
  {{-- end wrapper --}}
 </div>
 {{-- end header top --}}
</header>
{{-- end header --}}
