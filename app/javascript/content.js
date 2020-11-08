function post() {
  const submit = document.getElementById("submit");
  //index.htmlの投稿するのところに付与されたidからとってくる
  submit.addEventListener("click", (e) => {
    //クリックした時
    const formData = new FormData(document.getElementById("form"));
    //new FormDataで公式的な。(document.getElementById("form")はメモ投稿のフォームに入力された情報
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    // /リクエスト内容を書いている。HTTPメソッドはPOST、パスは/posts、非同期通信はtrue
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      //レスポンスとして返されたメモのレコードデータ
      const list = document.getElementById("list");
      //idで付与したlistをdocument系で取得
      const formText = document.getElementById("content");
      //後にformText.valueでリセットするからconstした

      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        //メモとして描画する部分のHTML。
      list.insertAdjacentHTML("afterend", HTML);
      //位置決めて挿入する奴。
      formText.value = "";
      //メモの入力フォームに入力されたままの文字をリセットする。正確には空欄””にする
    };
    e.preventDefault();
  });
}
window.addEventListener("load", post);