# Billennium-workshops-02-Lerna-and-monorepo


## Mono-repo vs multi-repo vs monolit

![](https://itzone.com.vn/wp-content/uploads/2020/12/6ed2d04e-dde1-485a-a10c-7dc6d9a887a8.jpeg)

### Mono-repo

![](https://miro.medium.com/max/540/1*jVGw66Ku1K2HslRGKcQT2w.jpeg)

Jedno repozytorium wraz z konkretnym podziałem na moduły. Każdy moduł to oddzielna paczka z innym setupem. Często
moduły konsumują się.

Przykładowo `moduł A (aplikacja admina)` wykorzystuje `moduł B (biblioteke komponentów)` oraz `moduł C (aplikacja mobilna)` również wykorzystuje `moduł B`.

Podobnie jak `typescript` inwestycja, która zwraca się po czasie.

#### Zalety

- Możliwość niezależnej pracy dla developerów.
- Mniejsza ilość konfliktów.
- Szybszy build time.
- Możliwość uruchomienia tylko części systemu.
- Szybszy development.
- Zmiana czegoś w całym systemie jest prosta - mamy jedno repozytorium kodu, podzielone logicznie.
- Schludne drzewo `gita`.
- Możliwość łatwego cofnięcia się w czasie w developmencie.
- Możliwość współdzielenia konfigów do `typescript`, `webpack` oraz innych.
- Łatwo wydzielić pracę dla dużego zespłu.
- Mniej problemów przy wymyślaniu nazw.

#### Wady

- Ogromny próg wejścia.
- Management bez narzędzi jak `lerna` to koszmar.
- Konfiguracja `CI & CD` jest ciężka.
- Wymaga doświadzonej osoby, która umie sobie poradzić z konfiguracją.

### Monolit

Kod całego systemu / aplikacji umiejscowiony w jednym repozytorium. Brak jakiegokolwiek podziału na jednostki logiczne. Wszystko jest ze sobą ściśle powiązane.

Przykładowo może to być jakiś silnik reguł walidacyjnych albo do obsługi animacji zapisany w jednym pliku.

#### Zalety

- Prostota.
- Mały próg wejścia.
- Łatwy `CI & CD`.
- Schludne drzewo gita.
- Zmiana większej ilości kodu, części rozwiązania jest łatwa.
- Brak dodatkowych zależności.

#### Wady

- Łatwo o konflikty.
- W momencie rozrostu funkcjonalności robi się bałagan.
- Większe ryzyko dojścia do momentu, w którym utrzymanie takiego rozwiązania będzie tak kosztowne, że lepiej będzie je przepisania.
- Trudno podzielić pracę.
- Łatwo o kolizję nazw.

### Modularny monolit

![](https://cdn-media-1.freecodecamp.org/images/S1UIv5TkaDGJjNGUjDudUMTPXhuyKITVkeZV)

Praktycznie tak samo jak wyżej. Koncept urozmaicony dodatkowym wewnętrznym podziałem na moduły, jednostki logiczne w celu poprawy skalowalności rozwiązania.

### Multi-repo

Koncept, w którym aplikacje, biblioteki są rozdzielone na osobne repozytoria.

#### Zalety

- Szybki build time.
- Niezależny development.
- Konflikty tylko wewnątrz jakiejś części rozwiązania, a nie całości.
- Łatwo wydzielić pracę dla dużego zespłu.
- Brak problemów przy kolizjach nazw.

#### Wady

- Wprowadzenie zmiany na `cały` system jest czasochłonne.
- Duplikujemy ciągle tą sama prace - konfiguracje.
- Cieżko prześledzić zmiany na całym systemie.
- Duplikowanie tej samej pracy.
- Ciężko współdzielić kod. Trzeba ciągle podnosić wersje bibliotek, z których
  się korzysta.
- Uruchomienie całego rozwiązania wymaga ściągnięcia innych repozytoriów oraz
  dodatkowej konfiguracji.

## Micro-frontends

![](https://digitaloutcomes.io/wp-content/uploads/2021/06/what-is-micro-frontends.jpg)

Podejście, w którym dzielimy aplikacje na mniejsze moduły pisane w różnych technologiach, które potem łączymy w całą aplikacje. Podejście nie ma nic wspólnego ze sposobem organizacji kodu w repozytorium.

Do połączenia ich w całość zazwyczaj wykorzystuje się warstwę abstrakcji, coś co przekształca komponent `angulara, vue, react` w coś co przeglądarka zrozumie. Tutaj idealnym przykładem będzie integracja komponentu `react` z `web component`. Później taki komponent można użyć w dowolnej apce `react, vue czy angular`.

```js
// Ręczne przekształcenie
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);

    const name = this.getAttribute("name");
    const url = "https://www.google.com/search?q=" + encodeURIComponent(name);
    ReactDOM.render(
      // tu można wstawić komponent React
      <a href={url}>{name}</a>,
      mountPoint
    );
  }
}
customElements.define("x-search", XSearch);

// Z użyciem gotowej biblioteki
// https://github.com/bitovi/react-to-webcomponent

// Użycie w react
return (
  <x-search name="custom-name">
  </x-search>
);
```

## Micro-frontends + mono-repo

https://blog.nrwl.io/monorepos-and-react-microfrontends-a-perfect-match-d49dca64489a

## Podział projektów w mono-repo

`lerna` wykorzystuje domyślnie konwencje, że każdy projekt wrzucamy do katalogu `packages`. Z innej konwencji korzysta narzędzie `nx` - tworzy dwa katalogi `apps` dla aplikacji oraz `libs` dla bibliotek.

Należy pamiętać, że w przypadku `lerny` można to łatwo zmienić i zastosować własne konwencję. W przykładzie stosujemy konwencję z narzędzia `nx` czyli katalogi `apps` i `libs`.

## Lerna

https://github.com/lerna/lerna

- Udostępnia szereg poleceń ułatwiających pracę z projektami podzielonymi na wiele paczek.
- Narzędzie śledzi zależności pomiędzy paczkami.
- Pozwala na uruchomienie konkretnych poleceń na wielu paczkach w tym samym momencie.
- Śledzi zależności w sposób `topologiczny` - czyli sprawdza co jest zależne od czego.

## Polecenia

- `npx lerna init` - tworzy plik konfiguracyjny. 
```json
{
  // Informacja gdzie znajdują się nasze paczki.
  "packages": ["apps/*", "libs/*"],
  "version": "0.0.0"
}
```
- `npx lerna ls` - wyświetla wszystkie paczki.
```js
@stackoff/budget-bot-web
@stackoff/schema
```
- `npx lerna ls --toposort` - wyświetla wszystkie paczki biorąc pod uwagę ich zależności względem siebie.
```js
// Lerna "wie", że schema jest używana w paczce "budget-bot-web" więc dlatego pokazała ją jako pierwszą.
@stackoff/schema
@stackoff/budget-bot-web
```
- `npx lerna ls --graph` - pokazuje zależności każdej paczki.
```js
{
  "@stackoff/budget-bot-web": [
    "@stackoff/schema",
    "react",
    "react-dom",
    "react-router",
    "react-router-dom"
  ],
  "@stackoff/schema": []
}
```
- `npx lerna ls --long` - wyświetli paczki oraz ich wersje.
- `npx lerna run start --parellel` - uruchomi polecenie start w każdej paczce.
- `npx lerna run --scope @stackoff/budget-bot-web start` - uruchomi polecenie `start` w paczce `budget-bot-web`.
- `npx lerna add schema` - dodaje zależność `schema` do każdej paczki po za paczką `schema`.
- `npx lerna add schema --dev` - to samo co wyżej lecz tym razem paczka `schema` będzie jako `devDependencies`.
- `npx lerna clean` - usuwa wszystkie `node_modules` w każdej paczce.
- `npx lerna bootstrap` - `npm install` w każdej paczce z uwzględnieniem zależności między nimi.
- `npx lerna exec "npm i"` - pozwala na uruchomienie innych poleceń.

## Implementacja mono-repo

Wystarczy prześledzić commity. Jak zawsze plik `README` do pominięcia.

![](data:image/jpeg;base64,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)

## Zarządzanie i utrzymanie projektów

Żeby wykorzystać maksymalnie potencjał mono-repo warto:

- Wydzielić pliki konfiguracyjne (`tsconfig.json`, `webpack.config.js`) bądź jakiekolwiek inne i umieścić je w katalogu głównym. Następnie takich konfiguracji można używać w innych paczkach.
- Utrzymywać te same konwencje nazewniczą skryptów w `package.json` - np. `start, build, test`.
- Wydzielać kod logiki biznesowej do bibliotek. Przykładowo mamy jakąś encje `user` i wiadome będzie, że pojawią sie formularze na interfejsie + walidacja. Więc można wydzielić bibliotekę `core` i tam umieszać takie rzeczy jak `serwisy, modele oraz logikę bieznesową`.
- Otworzyć edytor kodu na konkretnej paczce, a nie na całej solucji. Trochę to usprawni `development`.
- Wydzielić modele `ts` do oddzielnej libki. Można później używać jej na `fe/be`.
- Skonfigurować globalne reguły `eslinta` oraz `prettiera` dla wszystkich paczek. Jeżeli jest jakiś wyjątek w konkretnej paczce to zawsze można nadpisać.
- Utrzymywać w te same konwencje we wszystkich paczkach. Do tego można przygotować jakiś plik `README`.
- Napisać skrypty w `node`, które tworzą paczkę. Przykładowo `stackoff lib --ts` - stworzy cały katalog i przygotuje `boilerplate` pod bibliotekę. 

## Alternatywy

- Jeżeli projekt nie jest duży i chcemy wydzielić sobie bibliotekę jako osobną paczkę to zawsze możemy stworzyć taką paczkę i poprostu ją zainstalować jako lokalny moduł za pomocą polcenia `npm install 'scieżka do paczki'`.
- Wykorzystać profesjonaly tool `nx` od `nrwl`. Narzędzie, które posiada ogromne `cli`, które przygotowuje projekt w dowolnej technologi i pozwala na łatwe zarządzanie `mono-repo` czy nawet stworzenie rozwiązania typu `micro-fe`.

## Podsumowanie

To jakie podejście zastosować przy developmencie aplikacji zależy od jej rodzaju.

Tak w skrócie:

- `Mono-repo` warto stosować gdy w planujesz budować wiele rozwiązań i współdzielić określony kod pomiędzy nimi. Przykładowo jeżeli firma rozwija wiele aplikacji równocześnie to istnieje spora szansa, że część kodu pisanego przez innych developerów może się przydać. 

- `Multi-repo` warto użyć w momencie gdy aplikacje są tak unikalne, że raczej nie ma możliwości reużywania kodu, a jeżeli juz to zawsze można napisać bibliotekę i opublikować ja na `npm`.

- `Monolit` warto wykorzystać gdy nie potrzebujesz współdzielenia kodu i wiesz, że pisana przez Ciebie aplikacja czy biblioteka jest specyficzna. Zawsze dla przejrzystości można dokonać podziału wewnątrz dla skalowalności i przejrzystości rozwiązania stosując `modularny monolit`.

