var template = {
    list: function(topics){
      var list = '';
      var i = topics.length - 1;
      while(i >= 0){
        // 조회수 칸에 임의로 글 번호 넣음, 아직 조회수 구현 안해서 ...
        // author_id도 원래는 닉네임 넣어야 하는데 일단 저렇게 했음 일단 틀이라도 만들어보려고
        list += `
        <li>
        <ul>
          <li>${topics[i].id}</li>
          <li class="left"> <a href="/chicken/${topics[i].id}">${topics[i].title}</a> </li>
          <li>${topics[i].created}</li>
          <li>${topics[i].author_id}</li>
          <li>${topics[i].id}</li>
        </ul>
        </li>
        `;
        // list += `<li> <a href="/page/${topics[i].id}">${topics[i].title}</a> / ${topics[i].created}</li>`;
        /*
        <li>${topics[i].id}</li>
        <li class="left"> <a href="/chicken/${topics[i].id}">${topics[i].title}</a> </li>
        <li>${topics[i].created}</li>
        <li>${topics[i].author_id}</li>
        <li>${topics[i].id}</li>
        */
        i -= 1;
      }
      // list += '';

      return list;

/*
공통 부분
<ul>
    <li>1</li>
    <li class="left"><a href="post.html">제목제목제목제목1</a></li>
    <li>2014.07.09</li>
    <li>jk</li>
    <li>0</li>
</ul>
                          <li>
                              
                              <ul>
                                ${list}
                              </ul>
                          </li>
*/
  }

    ,mainList: function(topics){
      var list = '<ul>';
      var i = topics.length - 1;
      while(i >= 0){
          list += `<li> <a href="/page/${topics[i].id}">${topics[i].title}</a> / ${topics[i].created}</li>`;
          i -= 1;
      }
      list += '</ul>';

      return list;
  }

    , commentList : function(topic){
      var list = '<ul>';
      var i = topic.length - 1;
      while(i >= 0){
          var num =  topic[i].writer_id;
          list += `<li><p>${num} : ${topic[i].post} / ${topic[i].comment_created}</p></li>`;
          i -= 1;
      }
      list += '</ul>';

      return list;
    }

    ,authorSelect: function(authors, author_id){
      var tag='';
      var i=0;
      while(i<authors.length){
        var selected='';
        if(authors[i].id === author_id){
          selected = ' selected';
        }
        tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`
        i++;
      }

      return `
      <select name="author">
        ${tag}
      </select>
      `
    }
}

module.exports = template;