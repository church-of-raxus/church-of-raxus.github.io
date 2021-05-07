    let links = Cookies.get('Links');
    let titles = Cookies.get('Titles');

    if(typeof links == "undefined")
    {
        Cookies.set('Links', 'https://www.raxus-church.ml ');
        Cookies.set('Titles', 'Raxus-Church ');
    }

    let form = document.getElementById("formforlink");
    form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();


        var title = document.forms[0][0].value;
        var address = document.forms[0][1].value;

        Cookies.set('Links', Cookies.get('Links') + `${address}` + " ");
        Cookies.set('Titles', Cookies.get('Titles') + `${title}` + " ");
        form.submit();
    });

    let linkes = links.split(" ");
    let titlees = titles.split(" ");
    for(let i = 0; i < linkes.length; i++)
    {
        document.getElementById("linkstorage").innerHTML += '<a style="font-size: 21px; margin-left: 10px;" class="badge badge-info" href="' + `${linkes[i]}` + '">' + `${titlees[i]}` + '</a>';   
    }