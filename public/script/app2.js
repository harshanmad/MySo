var postId=0;
var postBodyElement=null;
/*$('.post').find('.interaction').find('a').eq(2).on('click', function (event) {
    $('#edit-modal').modal();
    console.log("It's works! Mudidi");
});
*/
$('.vb').on('click', function (event) {
    event.preventDefault();
    postBodyElement=event.target.parentNode.parentNode.childNodes[1];
    var postBody=postBodyElement.textContent;
    postId=event.target.parentNode.parentNode.dataset['postid'];
    $('#edit-modal').modal();
    $('#post-body').val(postBody);
});
$('#modal-save').on('click', function () {
    $.ajax({
        method:'POST',
        url:urlEdit,
        data:{body:$('#post-body').val(), postId:postId, _token:token}
    }).done(function (msg) {
        $(postBodyElement).text(msg['new_body']);
        $('#edit-modal').modal('hide');
    }
    );
});
$('.like').on('click', function (event) {
    event.preventDefault();
    var isLike=event.target.previousElementSibling==null;
    postId=event.target.parentNode.parentNode.dataset['postid'];
    $.ajax({
        method:'POST',
        url:urlLike,
        data:{isLike: isLike, postId: postId, _token:token}
    }).done(function () {
        event.target.innerText=isLike?event.target.innerText=='Like'? 'You like this post':'Like': event.target.innerText=='Dislike' ? 'You don\'t like this post':'Dislike';
    });
    if(isLike){
        event.target.nextElementSibling.innerText='Dislike';
    }else{
        event.target.previousElementSibling.innerText='Like';
    }
});