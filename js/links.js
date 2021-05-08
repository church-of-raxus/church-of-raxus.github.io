    let links = localStorage.getItem('Links');
    let titles = localStorage.getItem('Titles');
    if(links == "NaN")
    {
        localStorage.setItem('Links', 'https://www.raxus-church.ml ');
        localStorage.setItem('Titles', 'Raxus-Church ');
    }

    let form = document.getElementById("formforlink");
    form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();


        var title = document.forms[0][0].value;
        var address = document.forms[0][1].value;

        localStorage.setItem('Links', localStorage.getItem('Links') + `${address}` + " ");
        localStorage.setItem('Titles', localStorage.getItem('Titles') + `${title}` + " ");
        form.submit();
    });

    let linkes = links.split(" ");
    let titlees = titles.split(" ");
    for(let i = 0; i < linkes.length; i++)
    {
        document.getElementById("linkstorage").innerHTML += '<a style="font-size: 21px; margin-left: 10px;" class="badge badge-info" href="' + `${linkes[i]}` + '">' + `${titlees[i]}` + '</a>';   
    }