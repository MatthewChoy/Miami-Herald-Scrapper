$(document).ready(function() {
    var articleContainer = $(".article-container");
$(document).on("click","btn.delete", handleArticleDelete);
$(document).on("click","btn.notes", handleArticleNotes);
$(document).on("click","btn.save", handleArticleSave);
$(document).on("click","btn.delete", handleArticleDelete);

initPage();

function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data){
        if (data && data.length) {
            renderArticles(data);
        } else {
            renderEmpty();
        }
    });
}

function renderArticles(articles) {
    var articlesPanels =[];

    for(var i = 0; i < articles.length; i++) {
        articlesPanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
}

function createPanel(article) {
    var panel =
    $(["<div class='panel panel-default'>",
    "<div class='panel-heading'>",
    "<h3>,"
    article.headline,
    "<a class='btn btn-success save'>",
    "Save Article",
    "</a>",
    "</h3>",
    "</div>",
    "<div class='panel-body'>",
    article.summery,
    "</div>",
    "</div>"
    ].join(""));
}

function renderEmpty() { 
    var emptyAlert =
    $(["<div class='alert alert-warning text-center'>",
    "<h4>Uh oh. Looks like we don't have any new articles</h4>",
    "</div>",
    "<div class= 'panel panel-default'>",
    "<div class= 'panel-heading text-center'>",
    "<h4><a class='scrape-new'>Try Scraping New Article</a>></a></h4>",
    "<h4><a href='/saved'>Go To Saved Articles</a></h4>",
    "</div>",
    "</div>"
    ].join(""));
    articleContainer.append(emptyAlert);
}

function renderEmpty() {
    var emptyAlert = 
    $(["<div class= 'alert alert-warning text-center'>",
    "<h4>Uh Oh, Looks like we don't have any saved articles.</h4>",
    "</div>",
    "<div class='panel panel-default'>",
    "<div class= 'panel-heading text-center'>",
    "<h3>Would You Like To Browse Available Articles?</h3>",
    "</div>",
    "<div class= 'panel-heading text-center'>",
    "<h4><a> href='/'>Browse Articles</a></h4>",
    "</div>",
    "</div>"
    ].join(""));
    articleContainer.append(emptyAlert);
}

function renderNotesList(data) {
    var notesToRender = [];
    var currentNote;
    if(!data.notes.length) {
        currentNote = [
            "<li class='list-group-item'>",
            data.notes[i].noteText,
            "<button class='btn btn-danger note-delete'>x</button>",
            "</li>"
        ].join("");
        notesToRender.push(currentNote);
    }
    else {
        for(var i = 0; i < data.notes.length; i++) {
            currentNote = $([
                "<li class='list-group-item note'>",
                data.notes[i].noteText,
                "<button class='btn btn-danger note-delete'></button>",
                "</li>"
            ]).join(""));

            currentNote.children("button").data("_id", data.notes[i]._id);
            notesToRender.push(currentNote);
        }
    }
    $(".note-container".append(notesToRender);
}

function handleArticleDelete() {
    var articleToDelete = $(this).parents(".panel").data();

    $.ajax({
        method: "DELETE",
        url: "/api/headlines/" + articleToDelete._id
    }).then(function(data){
        if (data.ok) {
            initPage();
        }
    });
}

function handleArticleNotes() {
    var currentArticle = $(this).parents(".panel").data();
    $.get("/api/notes/" + currentArtical.id).then(function(data) {
        var modalText = [
          "<div class='container-fluid text-center'>",
          "<h4>Notes For Article: ",
          currentArticle._id,
          "</h4>",
          "<hr />",
          "ul class='list-group note-container'>",
          "</ul>",
          "<textarea placeholder='New Note' row='4' cols='60'></textarea>",
          "<button class='btn btn-success save'>Save Note</button>",
          "</div>"
        ].join("");
        bootbox.dialog({
            message: modalText,
            closeButton: true
        });
        var noteData = {
            _id: currentArtical._id,
            notes: data || []
        };
    
    $(".btn.save").data("article", noteData);

    renderNotesList(noteData);
    });
}

function handleNoteSave() {
    var noteData;
    var newNote = $(".bootbox-body textareas").then(function() {
        bootbox.hideAll();
    });
}

function handleNoteDelete() {
    var noteToDelete = $(this).data("_id");

    $.ajax({
        url: "/api/note/" + noteToDelete,
        method: "DELETE"
    }).then(function() {
        bootbox.hideAll();
    });
}