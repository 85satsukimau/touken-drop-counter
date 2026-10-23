// 全データをまとめる
    let allDataList = [];
    let currentGasUrl = localStorage.getItem('刀剣カウンター_GAS_URL') || '';
    let selectedDropIds = []; // 現在選択されている限定ドロップ刀剣のID（No.）を一時保存する箱
    let streakId = null;     // 今連打している刀剣男士のID
    let streakCount = 0;    // 現在の連打の合計数
    let streakTimer = null;   // 連打の途切れを監視するタイマー
    let actionLogList = []; //操作履歴（ログ）を順番に詰め込む箱
    // 未連携ユーザー用の全刀剣初期マスターデータ
    const defaultMasterList = [
      { id: "0", name: "童子切安綱 剥落", count: 0, isDefault: false, isEvent: false },
      { id: "3", name: "三日月宗近", count: 0, isDefault: true, isEvent: false },
      { id: "5", name: "小狐丸", count: 0, isDefault: true, isEvent: false },
      { id: "7", name: "石切丸", count: 0, isDefault: true, isEvent: false },
      { id: "9", name: "岩融", count: 0, isDefault: true, isEvent: false },
      { id: "11", name: "今剣", count: 0, isDefault: true, isEvent: false },
      { id: "13", name: "大典田光世", count: 0, isDefault: true, isEvent: false },
      { id: "15", name: "ソハヤノツルキ", count: 0, isDefault: true, isEvent: false },
      { id: "17", name: "数珠丸恒次", count: 0, isDefault: true, isEvent: false },
      { id: "19", name: "にっかり青江", count: 0, isDefault: true, isEvent: false },
      { id: "21", name: "鬼丸国綱", count: 0, isDefault: false, isEvent: false },
      { id: "23", name: "鳴狐", count: 0, isDefault: true, isEvent: false },
      { id: "25", name: "一期一振", count: 0, isDefault: true, isEvent: false },
      { id: "27", name: "鯰尾藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "29", name: "骨喰藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "31", name: "平野藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "33", name: "厚藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "35", name: "後藤藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "37", name: "信濃藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "39", name: "前田藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "41", name: "秋田藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "43", name: "博多藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "45", name: "乱藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "47", name: "五虎退", count: 0, isDefault: true, isEvent: false },
      { id: "49", name: "薬研藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "51", name: "包丁藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "53", name: "大包平", count: 0, isDefault: true, isEvent: false },
      { id: "55", name: "鶯丸", count: 0, isDefault: true, isEvent: false },
      { id: "57", name: "明石国行", count: 0, isDefault: true, isEvent: false },
      { id: "59", name: "蛍丸", count: 0, isDefault: true, isEvent: false },
      { id: "61", name: "愛染国俊", count: 0, isDefault: true, isEvent: false },
      { id: "63", name: "千子村正", count: 0, isDefault: true, isEvent: false },
      { id: "65", name: "蜻蛉切", count: 0, isDefault: true, isEvent: false },
      { id: "67", name: "物吉貞宗", count: 0, isDefault: true, isEvent: false },
      { id: "69", name: "太鼓鐘貞宗", count: 0, isDefault: true, isEvent: false },
      { id: "71", name: "亀甲貞宗", count: 0, isDefault: true, isEvent: false },
      { id: "73", name: "燭台切光忠", count: 0, isDefault: true, isEvent: false },
      { id: "75", name: "大般若長光", count: 0, isDefault: false, isEvent: false },
      { id: "77", name: "小竜景光", count: 0, isDefault: true, isEvent: false },
      { id: "79", name: "江雪左文字", count: 0, isDefault: true, isEvent: false },
      { id: "81", name: "宗三左文字", count: 0, isDefault: true, isEvent: false },
      { id: "83", name: "小夜左文字", count: 0, isDefault: true, isEvent: false },
      { id: "85", name: "加州清光", count: 0, isDefault: true, isEvent: false },
      { id: "87", name: "大和守安定", count: 0, isDefault: true, isEvent: false },
      { id: "89", name: "歌仙兼定", count: 0, isDefault: true, isEvent: false },
      { id: "91", name: "和泉守兼定", count: 0, isDefault: true, isEvent: false },
      { id: "93", name: "陸奥守吉行", count: 0, isDefault: true, isEvent: false },
      { id: "95", name: "山姥切国広", count: 0, isDefault: true, isEvent: false },
      { id: "97", name: "山伏国広", count: 0, isDefault: true, isEvent: false },
      { id: "99", name: "堀川国広", count: 0, isDefault: true, isEvent: false },
      { id: "101", name: "蜂須賀虎徹", count: 0, isDefault: true, isEvent: false },
      { id: "103", name: "浦島虎徹", count: 0, isDefault: true, isEvent: false },
      { id: "105", name: "長曽根虎徹", count: 0, isDefault: true, isEvent: false },
      { id: "107", name: "髭切", count: 0, isDefault: true, isEvent: false },
      { id: "112", name: "膝丸", count: 0, isDefault: true, isEvent: false },
      { id: "116", name: "大倶利伽羅", count: 0, isDefault: true, isEvent: false },
      { id: "118", name: "へし切長谷部", count: 0, isDefault: true, isEvent: false },
      { id: "120", name: "不動行光", count: 0, isDefault: true, isEvent: false },
      { id: "122", name: "獅子王", count: 0, isDefault: true, isEvent: false },
      { id: "124", name: "小烏丸", count: 0, isDefault: true, isEvent: false },
      { id: "126", name: "抜丸", count: 0, isDefault: false, isEvent: false },
      { id: "128", name: "同田貫正国", count: 0, isDefault: true, isEvent: false },
      { id: "130", name: "鶴丸国永", count: 0, isDefault: true, isEvent: false },
      { id: "132", name: "太郎太刀", count: 0, isDefault: true, isEvent: false },
      { id: "134", name: "次郎太刀", count: 0, isDefault: true, isEvent: false },
      { id: "136", name: "日本号", count: 0, isDefault: true, isEvent: false },
      { id: "138", name: "御手杵", count: 0, isDefault: true, isEvent: false },
      { id: "140", name: "巴形薙刀", count: 0, isDefault: true, isEvent: false },
      { id: "142", name: "毛利藤四郎", count: 0, isDefault: true, isEvent: false },
      { id: "144", name: "篭手切江", count: 0, isDefault: true, isEvent: false },
      { id: "146", name: "謙信景光", count: 0, isDefault: true, isEvent: false },
      { id: "148", name: "小豆長光", count: 0, isDefault: true, isEvent: false },
      { id: "150", name: "日向正宗", count: 0, isDefault: true, isEvent: false },
      { id: "152", name: "静形薙刀", count: 0, isDefault: true, isEvent: false },
      { id: "154", name: "南泉一文字", count: 0, isDefault: true, isEvent: false },
      { id: "156", name: "千代金丸", count: 0, isDefault: false, isEvent: false },
      { id: "158", name: "山姥切長義", count: 0, isDefault: false, isEvent: false },
      { id: "160", name: "豊前江", count: 0, isDefault: false, isEvent: false },
      { id: "162", name: "祢々切丸", count: 0, isDefault: false, isEvent: false },
      { id: "164", name: "白山吉光", count: 0, isDefault: false, isEvent: false },
      { id: "166", name: "南海太郎朝尊", count: 0, isDefault: false, isEvent: false },
      { id: "168", name: "肥前忠広", count: 0, isDefault: false, isEvent: false },
      { id: "170", name: "北谷菜切", count: 0, isDefault: false, isEvent: false },
      { id: "172", name: "桑名江", count: 0, isDefault: false, isEvent: false },
      { id: "174", name: "水心子正秀", count: 0, isDefault: false, isEvent: false },
      { id: "176", name: "源清麿", count: 0, isDefault: false, isEvent: false },
      { id: "178", name: "松井江", count: 0, isDefault: false, isEvent: false },
      { id: "180", name: "山鳥毛", count: 0, isDefault: false, isEvent: false },
      { id: "182", name: "古今伝授の太刀", count: 0, isDefault: false, isEvent: false },
      { id: "184", name: "地蔵行平", count: 0, isDefault: false, isEvent: false },
      { id: "186", name: "治金丸", count: 0, isDefault: false, isEvent: false },
      { id: "188", name: "日光一文字", count: 0, isDefault: false, isEvent: false },
      { id: "190", name: "太閤左文字", count: 0, isDefault: false, isEvent: false },
      { id: "192", name: "五月雨江", count: 0, isDefault: false, isEvent: false },
      { id: "194", name: "大千鳥十文字槍", count: 0, isDefault: false, isEvent: false },
      { id: "196", name: "泛塵", count: 0, isDefault: false, isEvent: false },
      { id: "198", name: "一文字則宗", count: 0, isDefault: false, isEvent: false },
      { id: "200", name: "村雲江", count: 0, isDefault: false, isEvent: false },
      { id: "202", name: "姫鶴一文字", count: 0, isDefault: false, isEvent: false },
      { id: "204", name: "福島光忠", count: 0, isDefault: false, isEvent: false },
      { id: "206", name: "七星剣", count: 0, isDefault: false, isEvent: false },
      { id: "208", name: "丙子椒林剣", count: 0, isDefault: false, isEvent: false },
      { id: "210", name: "稲葉江", count: 0, isDefault: false, isEvent: false },
      { id: "212", name: "笹貫", count: 0, isDefault: false, isEvent: false },
      { id: "214", name: "人間無骨", count: 0, isDefault: false, isEvent: false },
      { id: "216", name: "八丁念仏", count: 0, isDefault: false, isEvent: false },
      { id: "218", name: "石田正宗", count: 0, isDefault: false, isEvent: false },
      { id: "220", name: "実休光忠", count: 0, isDefault: false, isEvent: false },
      { id: "222", name: "京極正宗", count: 0, isDefault: false, isEvent: false },
      { id: "224", name: "孫六兼元", count: 0, isDefault: false, isEvent: false },
      { id: "226", name: "後家兼光", count: 0, isDefault: false, isEvent: false },
      { id: "228", name: "火車切", count: 0, isDefault: false, isEvent: false },
      { id: "230", name: "富田江", count: 0, isDefault: false, isEvent: false },
      { id: "232", name: "大慶直胤", count: 0, isDefault: false, isEvent: false },
      { id: "234", name: "九鬼正宗", count: 0, isDefault: false, isEvent: false },
      { id: "236", name: "雲生", count: 0, isDefault: false, isEvent: false },
      { id: "238", name: "道誉一文字", count: 0, isDefault: false, isEvent: false },
      { id: "240", name: "雲次", count: 0, isDefault: false, isEvent: false },
      { id: "242", name: "面影", count: 0, isDefault: false, isEvent: false },
      { id: "244", name: "古備前信房", count: 0, isDefault: false, isEvent: false },
      { id: "246", name: "倶利伽羅江", count: 0, isDefault: false, isEvent: false },
      { id: "248", name: "三郎国宗", count: 0, isDefault: false, isEvent: false },
      { id: "250", name: "安宅切", count: 0, isDefault: false, isEvent: false },
      { id: "252", name: "二筋樋貞宗", count: 0, isDefault: false, isEvent: false },
      { id: "254", name: "雲重", count: 0, isDefault: false, isEvent: false },
      { id: "256", name: "柏太刀", count: 0, isDefault: false, isEvent: false },
      { id: "258", name: "波平行安", count: 0, isDefault: false, isEvent: false },
      { id: "260", name: "狐ヶ崎為次", count: 0, isDefault: false, isEvent: false },
      { id: "262", name: "桃太郎祐定", count: 0, isDefault: false, isEvent: false },
      { id: "264", name: "朝倉藤四郎", count: 0, isDefault: false, isEvent: false }
    ];



  
    // ページが開いた瞬間のタイムライン
    window.onload = function() {
      // 過去の操作履歴があれば呼び出す
      const savedLog = localStorage.getItem('刀剣カウンター_ACTION_LOG');
      if (savedLog) actionLogList = JSON.parse(savedLog);

      if (currentGasUrl) {
        document.getElementById('gasUrlInput').value = currentGasUrl;
        fetchInitialData();
      } else {
        // ★GAS連携していない場合、前回ブラウザに自動保存されたデータがあれば復元する
        const localData = localStorage.getItem('刀剣カウンター_LOCAL_DATA');
        const localEvName = localStorage.getItem('刀剣カウンター_LOCAL_EV_NAME');
        const localEvPeriod = localStorage.getItem('刀剣カウンター_LOCAL_EV_PERIOD');
        if (localData) {
          document.getElementById('evName').innerText = '・' + (localEvName || '催物未設定') + '・';
          document.getElementById('evPeriod').innerText = localEvPeriod || '　';
          allDataList = JSON.parse(localData);
        } else {
          // 完全な初回起動時は内蔵のマスターデータを複製してセット
          document.getElementById('evName').innerText = '・催物未設定・';
          document.getElementById('evPeriod').innerText = '　';
          // defaultMasterListの順番（オリジナル順）を付与しながらallDataListにコピー
          allDataList = defaultMasterList.map((item, index) => {
            item.originalOrder = index;
            return { ...item }; // 中身を安全にコピー
          });
          // 初回の更地データをローカルストレージにも一度保存しておく
          localStorage.setItem('刀剣カウンター_LOCAL_DATA', JSON.stringify(allDataList));
        }

        // カウンターと記録画面を綺麗に描画
        renderCounter();
        renderRecord();
      }
    }


    // ユーザーが自分のURLを保存したときの処理
    function saveGasUrl() {
      const url = document.getElementById('gasUrlInput').value.trim();
      const msgEl = document.getElementById('gasconfigMessage');
      // まったく入力されていない空欄の場合
      if (!url) {
        msgEl.innerText = "⚠ GASウェブアプリのURLを入力してください。";
        msgEl.style.color = "#7a1622";
        msgEl.style.display = "block";
        return;
      }
      // 入力はあるが、末尾が「/exec」になっていないなどGASアプリのURLではない場合のガード
      if (!url.startsWith("https://script.google.com") || !url.includes("/exec")) {
        msgEl.innerText = "⚠ 正しいウェブアプリURL（末尾が /exec のもの）を入力してください。";
        msgEl.style.color = "#7a1622";
        msgEl.style.display = "block";
        return;
      }
      // 正常に入力されている場合のみ、これ以降の保存・読み込み処理を実行
      localStorage.setItem('刀剣カウンター_GAS_URL', url);
      currentGasUrl = url;
      msgEl.innerText = "🌸 設定を保存しました。再読込中...";
      msgEl.style.color = "#1e4d2b";
      msgEl.style.display = "block";
      
      setTimeout(() => {
        msgEl.style.display = "none";
        toggleBackupModal(false); // 保存モーダルを閉じる
      }, 1200);

      // 接続可能なURLがあるときだけデータを読み込みにいく
      fetchInitialData();
    }

    // 設定ボタンを開く
    function toggleConfigModal(show) {
      const modal = document.getElementById('configModal');
      if (show) {
        modal.classList.add('open');
        // 現在画面に表示されている文字を入力欄に逆流させて初期値にする
        const currentEvName = document.getElementById('evName').innerText.replace(/・/g, '');
        // 催物未設定のときは空に、それ以外のときは名前をそのまま入力欄に
        if (currentEvName === "催物未設定") {
          document.getElementById('inputEvName').value = '';
        } else {
          document.getElementById('inputEvName').value = currentEvName;
        }
        document.getElementById('inputEvPeriod').value = document.getElementById('evPeriod').innerText.trim();
        // 検索窓を空にしておく
        document.getElementById('dropSearchInput').value = '';
        const dropClearBtn = document.getElementById('dropSearchInputClear');
        if (dropClearBtn) dropClearBtn.style.display = 'none';
        document.getElementById('dropSuggestList').style.display = 'none';
        // 現在すでにイベント限定ドロップフラグが立っている刀剣のIDを配列に集め、バッジを描画
        selectedDropIds = allDataList.filter(item => item.isEvent).map(item => item.id);
        renderDropTags();
        toggleClearBtn('inputEvName', 'inputEvNameClear');
        toggleClearBtn('inputEvPeriod', 'inputEvPeriodClear');
        toggleClearBtn('dropSearchInput', 'dropSearchInputClear');
      } else {
        modal.classList.remove('open');
        document.getElementById('configMessage').style.display = "none";
      }
    }

    // 保存・引継モーダルの表示 / 閉じる
    function toggleBackupModal(show) {
      const modal = document.getElementById('backupModal');
      const inputEl = document.getElementById('backupDataInput');
      const msgEl = document.getElementById('configMessage');
      const gasMsgEl = document.getElementById('gasconfigMessage');
      
      if (show) {
        modal.classList.add('open');
        // 前回の入力内容やバックアップ側のエラーメッセージをクリア
        if (inputEl) inputEl.value = '';
        if (msgEl) msgEl.style.display = "none";
        
        // 次にモーダルを開いたときに、前回のGAS連携警告メッセージを消去する
        if (gasMsgEl) {
          gasMsgEl.style.display = "none";
          gasMsgEl.innerText = "";
        }
        
        toggleClearBtn('backupDataInput', 'backupDataInputClear');
      } else {
        modal.classList.remove('open');
      }
    }




    // GitHubとGASを安全に有線接続
    function fetchInitialData() {
      document.getElementById('evName').innerText = '・読込中...・';
      document.getElementById('counterContainer').innerHTML = '<div class="loading">🌸スプレッドシートからデータを読み込んでいます...</div>';
      // Googleのセキュリティをすり抜ける no-cors モードでGASを呼び出す
      fetch(currentGasUrl + '?action=get', {
        method: 'GET',
        mode: 'no-cors'
      })
      .then(() => {
        // no-corsでは中身が直接読めないため、予備の通信(JSONP)へバトンタッチ
        const script = document.createElement('script');
        script.src = currentGasUrl + '?callback=initializeUI';
        document.body.appendChild(script);
        script.onload = () => document.body.removeChild(script);
      })
      .catch(err => {
        document.getElementById('counterContainer').innerHTML = '<div class="loading">通信が遮断されました。数秒後に再試行してください</div>';
      });
    }


    // データを反映
    function initializeUI(data) {
      // エラー時
      if (data.error) {
        document.getElementById('counterContainer').innerHTML = `<div class="loading">${data.error}</div>`;
        return;
      }
      // イベント名を反映
      document.getElementById('evName').innerText = '・' + data.eventName + '・';
      // イベント開催期間を反映
      document.getElementById('evPeriod').innerText = data.period || '';
      // スプレッドシートのurlがある場合シートを開くボタンに反映
      if(data.url) document.getElementById('ssLink').href = data.url;
      
      // 刀剣男士の順番を保持する
      allDataList = data.list.map((item, index) => {
        item.originalOrder = index;
        return item;
      });
      // 次の関数を実行
      renderCounter();
      renderRecord();
    }

    // 文字の有無に応じてバツボタンの表示・非表示を切り替える
    function toggleClearBtn(inputId, clearBtnId) {
       const inputEl = document.getElementById(inputId); // ✨先頭でinputElを定義
      if (!inputEl) return;
      const query = inputEl.value.trim();
      const clearBtn = document.getElementById(clearBtnId);
      if (clearBtn) {
        if (query) {
          // 文字が入っている場合：ボタンを表示し、入力欄の右側をあける
          clearBtn.style.display = 'block';
          inputEl.classList.add('has-clear-btn');
        } else {
          // 空っぽの場合：ボタンを隠し、右側の隙間をなくして案内文字をフル表示する
          clearBtn.style.display = 'none';
          inputEl.classList.remove('has-clear-btn');
        }
      }
    }

    // 検索ボックスの全クリア（×）ボタンの挙動
    function clearAnyInput(inputId, clearBtnId, callbackFunction) {
      const inputEl = document.getElementById(inputId);
      if (!inputEl) return;
      inputEl.value = ''; // 文字を空にする
      toggleClearBtn(inputId, clearBtnId); // ボタンを非表示にする
      
      // 連動して画面更新が必要な場合は、その関数（onSearchなど）を呼び出す
      if (callbackFunction) callbackFunction();
      
      inputEl.focus(); // すぐ次の入力を始められるようにフォーカスを戻す
    }


    // 検索ボックスに入力があった場合の挙動
    function onSearch() {
      toggleClearBtn('searchBox', 'searchBoxClear'); // 文字があれば×を表示 
      renderCounter(); 
    }



    // カウンターに各刀剣のカードを配置
    function renderCounter() {
      // 検索ボックスの中身=query
      const query = document.getElementById('searchBox').value.trim().toLowerCase();
      // カウンター領域=container
      const container = document.getElementById('counterContainer');
      
      // カウンター領域の設定
      container.innerHTML = '';
      // フィルターで表示される刀剣のデータリスト=filtered
      let filtered = allDataList;
      // 検索が空ならイベント限定ドロップと通常ドロップを表示
      if (!query) {
        filtered = allDataList.filter(item => item.isEvent || item.isDefault || item.count > 0);
      } else {
        // 検索欄と一致する名前かIDの男士を絞り込む
        filtered = allDataList.filter(item => 
          item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query)
        );
      }
      // フィルターで抽出された男士の順番（イベント限定>通常、ID順）
      filtered.sort((a, b) => {
        if (a.isEvent && !b.isEvent) return -1;
        if (!a.isEvent && b.isEvent) return 1;
        if (a.isDefault && !b.isDefault) return -1;
        if (!a.isDefault && b.isDefault) return 1;
        return a.originalOrder - b.originalOrder;
      });
     // 該当男士が0の時の表示
      if(filtered.length === 0) {
        container.innerHTML = '<div class="loading">🌸読み込み中...</div>';
        return;
      }
      // 小見出し用の枠=currentSection
      let currentSection = '';
      // 全てのデータに対して
      filtered.forEach(item => {
        // 全ての男士のデータにラベリング
        let sectionName = 'その他の刀剣';
        if (item.isEvent) sectionName = 'イベント限定ドロップ';
        else if (item.isDefault) sectionName = '通常ドロップ';
        // ラベルの変更地点に小見出しを出現させる
        if (currentSection !== sectionName && !query) {
          currentSection = sectionName;
          const header = document.createElement('div');
          header.className = 'sec-ttl';
          header.innerText = currentSection;
          container.appendChild(header);
        }
        // カウンターの各刀剣のカードの設定
        const card = document.createElement('div');
        card.className = 'card';
        // ボタン領域および名前、IDを配置
        card.innerHTML = `
          <div class="name-box">
            <span class="name">${item.name}</span>
            <span class="id num-style"">No.${item.id}</span>
          </div>
          <div class="actions">
            <button type="button" class="btn btn-minus" onclick="changeCount('${item.name}', -1, '${item.id}')">－</button>
            <div style="position: relative; min-width: 24px; text-align: center;">
              <span class="floating-notice num-style" id="notice-${item.id}"></span>
              <span class="count ${item.count > 0 ? 'has-value' : ''}" id="count-${item.id}">${item.count}</span>
            </div>
            <button type="button" class="btn btn-plus" onclick="changeCount('${item.name}', 1, '${item.id}')">＋</button>
          </div>
        `;
        container.appendChild(card);
      });
    }

    // ドロップ記録の挙動
    function renderRecord() {
      // 表を初期化
      const tbody = document.getElementById('recordTableBody');
      tbody.innerHTML = '';
      // ドロップした男士を多い順に並べる（同じドロップ数ではイベント限定ドロップを上に）
      const loggedItems = allDataList.filter(item => item.count > 0);
      loggedItems.sort((a, b) => {
        if(b.count !== a.count){return b.count - a.count;}
        if(a.isEvent && !b.isEvent) return -1;
        if(!a.isEvent && b.isEvent) return 1;
        return a.originalOrder - b.originalOrder;
      });
      // 合計ドロップ数の枠を用意
      let total = 0;
      // ドロップがない場合
      if (loggedItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#6d5652;">まだドロップ記録はありません</td></tr>';
      } else {
        // ドロップがある場合
        loggedItems.forEach(item => {
          // 合計ドロップ数に加算
          total += item.count;
          const tr = document.createElement('tr');
          const idWeight = item.isEvent ? '600' : 'normal';
          const nameWeight = item.isEvent ? '700' : 'normal';
          const countWeight = item.isEvent ? '800' : '500';
          /* イベント限定行 */
          if (item.isEvent) {
            tr.className = 'event-row';
          }
          
          // 表にID,名前,ドロップ数を追加（太さは一貫して美しく統一）
          tr.innerHTML = `
            <td class="rk-num" style="font-weight:${idWeight};">${item.id}</td>
            <td class="rk-name" style="font-weight:${nameWeight};">${item.name}</td>
            <td class="rk-num" style="font-weight:${countWeight};color:#1e4d2b;">${item.count}</td>
          `;
          tbody.appendChild(tr);
        });
      }
      // 合計ドロップ数を表示
      document.getElementById('totalCount').innerText = total;
    }

    // カウンターの実働部
    function changeCount(name, delta, id) {
      // ボタンが押された男士のデータを特定
      const item = allDataList.find(i => i.id === id);
      if (!item) return;
      // マイナスにならないようにする
      const newCount = Math.max(0, item.count + delta);
      if (item.count === 0 && delta === -1) return;
      // ボタンが押されたら変化数を表示
      const noticeEl = document.getElementById(`notice-${id}`);
      if (noticeEl) {
        // 1秒以内に同じ男士、かつ同じ方向（プラス同士・マイナス同士）が押されたら連打を合算
        if (streakId === id && Math.sign(streakCount) === Math.sign(delta)) {
          clearTimeout(streakTimer);
          streakCount += delta;
        } else {
          clearTimeout(streakTimer);
          streakId = id;
          streakCount = delta;
        }
        // 演出の文字とクラスを一度クリアして再描画
        noticeEl.className = "floating-notice num-style";
        noticeEl.innerText = streakCount > 0 ? `+${streakCount}` : `${streakCount}`;
        void noticeEl.offsetWidth; // 再描画用
        noticeEl.classList.add(streakCount > 0 ? "show-plus" : "show-minus");
        // 1秒間タップが止まったらリセット
        streakTimer = setTimeout(() => {
          streakId = null;
          streakCount = 0;
        }, 1000);
      }
      item.count = newCount;
      // 画面の書き換え
      const countEl = document.getElementById(`count-${id}`);
      if (countEl) {
        // 数字の書き換え
        countEl.innerText = newCount;
        // 色の書き換え
        if (newCount > 0) countEl.classList.add('has-value');
        else countEl.classList.remove('has-value');
      }
      // ドロップ記録を合わせて更新
      renderRecord();
        // 各自のGASのupdate命令を飛ばすAPI命令
       if (currentGasUrl) {
        const targetUrl = `${currentGasUrl}?action=update&name=${encodeURIComponent(name)}&delta=${delta}&id=${id}`;
        // ブラウザのブロックを無効化する命令
        fetch(targetUrl, {
          method: 'GET',
          mode: 'no-cors'
        })
        .catch(err => console.error("通信割り込み発生"));
      }
      // GAS未連携のときのために、ブラウザのローカルストレージにも即時自動保存
      if (!currentGasUrl) {
        localStorage.setItem('刀剣カウンター_LOCAL_DATA', JSON.stringify(allDataList));
      }

     // 履歴記録
      const timeStr = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      // 新しいログオブジェクトを作成
      const newLog = {
        time: timeStr,
        name: name,
        delta: delta,
        count: Math.abs(delta) // 連続判定用の初期値
      };
      // ログの先頭（一番最新）に新しい操作を差し込む
      actionLogList.unshift(newLog);
      // 同じキャラクターが連続している場合はまとめる
      let condensedLog = [];
      for (let i = 0; i < actionLogList.length; i++) {
        const current = actionLogList[i];
        const lastCondensed = condensedLog[condensedLog.length - 1];
        // 1つ前のログと同じ名前、かつ同じ増減（プラス同士・マイナス同士）が連続していたら合算する
        if (lastCondensed && lastCondensed.name === current.name && Math.sign(lastCondensed.delta) === Math.sign(current.delta)) {
          lastCondensed.count += current.count;
          // 時間はより新しい方（ループの最初の方）の時間を維持する
        } else {
          // 連続していなければ、新しい行としてそのまま記録
          condensedLog.push({ ...current });
        }
      }
      // 画面表示用に、整理されたログの一時リストをブラウザの記憶に最新保存
      localStorage.setItem('刀剣カウンター_ACTION_LOG', JSON.stringify(condensedLog));
    }

    // タブの切り替え
    function switchTab(tabName, btn) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`panel-${tabName}`).classList.add('active');
    }

    // 指南の表示/閉じる
    function toggleModal(show) {
      const modal = document.getElementById('guideModal');
      if (show) modal.classList.add('open');
      else modal.classList.remove('open');
    }

    // 表をコピーする
    function copyToClipboard() {
      const loggedItems = allDataList.filter(item => item.count > 0);
      const btn = document.getElementById('copyBtn');
      if (loggedItems.length === 0) { return; }
      // 見出し
      let text = "No.\t刀剣名\tドロップ数\n";
      // ドロップ数が多い順にコピー
      loggedItems.sort((a, b) => {
        if(b.count !== a.count){return b.count - a.count;}
        if(a.isEvent && !b.isEvent) return -1;
        if(!a.isEvent && b.isEvent) return 1;
        return a.originalOrder - b.originalOrder;
      }).forEach(item => {
        text += `${item.id}\t${item.name}\t${item.count}\n`;
      });
      // クリップボードに書き込む
      navigator.clipboard.writeText(text).then(() => {
        // ボタンの文字を変更
        btn.innerText = "コピー完了";
        setTimeout(() => {
          btn.innerText = "コピー";
        }, 1500);
      }).catch(err => { console.error('コピー失敗'); });
    }

   // シートを開くボタンを押したときの挙動
    function openSpreadsheet(event) {
      if (!currentGasUrl) {
        event.preventDefault(); // 新しいタブが開くのをブロック
        const msgEl = document.getElementById('recordMessage');
        msgEl.innerText = "⚠ スプレッドシート連携がされていません。";
        msgEl.style.color = "#7a1622"; // 緑色から臙脂色にその場でスイッチ
        msgEl.style.display = "block";
        // 2秒後に自然に消去
        setTimeout(() => {
          msgEl.style.display = "none";
        }, 2000);
      }
    }


    
    // データ保存・引継ぎ機能（スプシ未連携ユーザー用）
    // データエキスポート
    function exportData() {
      // 画面に表示されている現在のイベント情報を取得
      const eventName = document.getElementById('evName').innerText.replace(/・/g, '');
      const period = document.getElementById('evPeriod').innerText;
      // 保存用のオブジェクトを作成
      const backupData = {
        eventName: eventName,
        period: period,
        // カウントが1以上のものだけでなく、構造を維持するため現在の全リストをそのまま保存
        list: allDataList.map(item => ({
          id: item.id,
          name: item.name,
          count: item.count,
          isEvent: item.isEvent || false,
          isDefault: item.isDefault || false
        }))
      };
      // JSONテキストに変換
      const jsonString = JSON.stringify(backupData);
      // クリップボードにコピー
      navigator.clipboard.writeText(jsonString).then(() => {
        // 設定画面内のメッセージ欄を使ってアナウンス
        const msgEl = document.getElementById('configMessage');
        msgEl.innerText = "📋 バックアップデータをコピーしました！メモ帳等に保存してください。";
        msgEl.style.color = "#1e4d2b";
        msgEl.style.display = "block";
        setTimeout(() => { msgEl.style.display = "none"; }, 3000);
      }
      ).catch(err => {
        alert("コピーに失敗しました。ブラウザの権限を許可してください。");
      });
    }

    // データインポート
    function importData() {
      // 入力欄のデータを取得
      const inputEl = document.getElementById('backupDataInput');
      const jsonInput = inputEl.value.trim();
      const msgEl = document.getElementById('configMessage');
      // 何も入力されていない場合
      if (!jsonInput) {
        msgEl.innerText = "⚠ テキストエリアにデータを貼り付けてください。";
        msgEl.style.color = "#7a1622";
        msgEl.style.display = "block";
        return;
      }
      try {
        // 入力されたテキストをデータ構造に逆変換
        const parsed = JSON.parse(jsonInput);
        // データの整合性チェック（最低限リストが存在するか）
        if (!parsed.list || !Array.isArray(parsed.list)) {
          throw new Error("データ形式が正しくありません。");
        }
        // イベント名と期間の復元
        document.getElementById('evName').innerText = '・' + (parsed.eventName || '未設定') + '・';
        document.getElementById('evPeriod').innerText = parsed.period || '　';
        // 刀剣男士リストの復元
        allDataList = parsed.list.map((item, index) => {
          item.originalOrder = index; // 元の順番を再定義
          return item;
        });
        // 画面の再描画
        renderCounter();
        renderRecord();
        // ローカルストレージにも保存
        localStorage.setItem('刀剣カウンター_LOCAL_DATA', JSON.stringify(allDataList));
        localStorage.setItem('刀剣カウンター_LOCAL_EV_NAME', parsed.eventName || '');
        localStorage.setItem('刀剣カウンター_LOCAL_EV_PERIOD', parsed.period || '');
        // 入力エリアに成功メッセージを表示
        inputEl.value = "データの復元に成功しました！";
        inputEl.style.color = "#1e4d2b"; // 文字色を成功の緑色に
        inputEl.style.fontWeight = "bold";
        inputEl.style.textAlign = "center";
        // 下のメッセージ部屋は成功時は非表示に
        msgEl.style.display = "none";
        // 1.2秒後にモーダルを閉じ、次回のためにテキストエリアをリセットする
        setTimeout(() => { 
          toggleBackupModal(false); // モーダルを閉じる
          // モーダルが閉じた後にスタイルと値を初期状態に戻す
          inputEl.value = '';
          inputEl.style.color = '';
          inputEl.style.fontWeight = '';
          inputEl.style.textAlign = '';
        }, 1200);
      } catch (e) {
        alert("データの読み込みに失敗しました。正しいバックアップテキストを貼り付けてください。");
      }
    }

   
    // イベント情報更新＋スプシへ同期
    function saveEventInfo() {
      let name = document.getElementById('inputEvName').value.trim();
      const period = document.getElementById('inputEvPeriod').value.trim();
      const msgEl = document.getElementById('configMessage');
      if (!name) {
        name="催物未設定"
      }
      // 画面上のヘッダー表示を即時更新
      document.getElementById('evName').innerText = '・' + name + '・';
      document.getElementById('evPeriod').innerText = period || '　';
      // 選択された配列（selectedDropIds）を基に、全刀剣データリストのisEventフラグを更新
      allDataList = allDataList.map(item => {
        item.isEvent = selectedDropIds.includes(item.id);
        return item;
      });
      // ローカルストレージに最新状態を記憶
      localStorage.setItem('刀剣カウンター_LOCAL_EV_NAME', name);
      localStorage.setItem('刀剣カウンター_LOCAL_EV_PERIOD', period);
      localStorage.setItem('刀剣カウンター_LOCAL_DATA', JSON.stringify(allDataList));
      // メイン画面のカウンターと記録テーブルを最新のフラグ状態で再描画
      renderCounter();
      renderRecord();

      // 通信の成否を待たずに、画面中央に成功トーストを出してモーダルを「即座」に閉じる
      showCustomToast("🌸 イベント設定を反映しました。");
      setTimeout(() => {
        toggleConfigModal(false);
      }, 100);
      // スプレッドシート連携済みの場合は、裏側でGAS側へも同期（従来のカンマ区切り文字列を作って送信）
      if (currentGasUrl) {
        const dropsRaw = selectedDropIds.join(', ');
        const targetUrl = `${currentGasUrl}?action=setupEvent&eventName=${encodeURIComponent(name)}&period=${encodeURIComponent(period)}&drops=${encodeURIComponent(dropsRaw)}`;
        
        // .then を使わずに通信を投げっぱなしにすることで、ユーザーの操作を1ミリ秒も邪魔しません
        fetch(targetUrl, { method: 'GET', mode: 'no-cors' })
        .catch(err => {
          // 万が一裏側で通信が途切れた場合は、コンソールにのみログを残します
          console.error("スプレッドシートとのバックグラウンド同期に失敗しました", err);
        });
      }
    }


    // 限定ドロップの検索窓に入力があった時の挙動
    function onDropSearch() {
      const query = document.getElementById('dropSearchInput').value.trim().toLowerCase();
      toggleClearBtn('dropSearchInput', 'dropSearchInputClear'); // 文字があれば×を表示
      const listEl = document.getElementById('dropSuggestList');
      listEl.innerHTML = '';
      // 入力が空なら候補リストを閉じて終了
      if (!query) {
        listEl.style.display = 'none';
        return;
      }
      // 全刀剣（allDataList）から、名前かIDが一致し、かつ「まだ選択されていない」男士を最大5人抽出
      const matches = allDataList.filter(item => 
        (item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query)) &&
        !selectedDropIds.includes(item.id)
      ).slice(0, 5);
      if (matches.length === 0) {
        listEl.style.display = 'none';
        return;
      }
      // 候補をリストとして生成
      matches.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggest-item';
        div.innerHTML = `<span>${item.name}</span><span class="num-style" style="font-size:0.65rem; color:#8c7672;">No.${item.id}</span>`;
        // クリックしたら選択バッジに追加する
        div.onclick = () => addDropTag(item.id);
        listEl.appendChild(div);
      });
      listEl.style.display = 'block';
    }

    // 候補から選ばれた刀剣をバッジ（タグ）として追加する
    function addDropTag(id) {
      if (!selectedDropIds.includes(id)) {
        selectedDropIds.push(id);
        renderDropTags();
      }
      // 入力欄をクリアして候補リストを閉じる
      document.getElementById('dropSearchInput').value = '';
      document.getElementById('dropSuggestList').style.display = 'none';
    }

    // 選択されたバッジの一覧を画面に描画する
    function renderDropTags() {
      const container = document.getElementById('selectedDropsContainer');
      container.innerHTML = '';
      if (selectedDropIds.length === 0) {
        container.innerHTML = 
        '<span style="font-size:0.7rem; line-height:24px; color:#bcaaa4;">限定ドロップが未選択です</span>';
        return;
      }
      selectedDropIds.forEach(id => {
        const item = allDataList.find(i => i.id === id);
        if (!item) return;
        const badge = document.createElement('span');
        badge.className = 'tag-badge';
        badge.innerHTML = `
          <span>${item.name}</span>
          <span class="tag-del-btn" onclick="removeDropTag('${id}')">×</span>
        `;
        container.appendChild(badge);
      });
    }

    // バッジの「×」を押したときに限定ドロップから外す
    function removeDropTag(id) {
      selectedDropIds = selectedDropIds.filter(currentId => currentId !== id);
      renderDropTags();
    }


    // カウント履歴表示
    function loadEventLog() {
      const container = document.getElementById('logContainer');
      container.innerHTML = '';
      // ローカルストレージから最新の整理済みログを読み込む
      const savedLog = localStorage.getItem('刀剣カウンター_ACTION_LOG');
      const displayLogList = savedLog ? JSON.parse(savedLog) : [];
      if (displayLogList.length === 0) {
        container.innerHTML = '<div style="text-align:center; color:#8c7672; padding:10px 0;">まだカウント履歴はありません</div>';
        return;
      }
      const ul = document.createElement('ul');
      ul.style.margin = '0'; 
      ul.style.paddingLeft = '14px';
      ul.style.listStyleType = 'circle';
      // 箇条書きを生成
      displayLogList.forEach(log => {
        const li = document.createElement('li');
        li.style.marginBottom = '5px';
        // プラスかマイナスかで文字の装飾や色を変更
        const mark = log.delta > 0 ? '＋' : '－';
        const color = log.delta > 0 ? '#1e4d2b' : '#7a1622'; // プラスは緑、マイナスは赤
        li.innerHTML = `
          <span class="num-style" style="color:#8c7672; font-size:0.65rem; margin-right:6px;">[${log.time}]</span>
          <strong>${log.name}</strong> 
          <span class="num-style" style="color:${color}; font-weight:bold; margin-left:4px;">${mark}${log.count}振</span>
        `;
        ul.appendChild(li);
      });
      container.appendChild(ul);
    }


    // データリセット
        // リセット確認モーダルの開閉（新規追加）
    function toggleResetModal(show) {
      const modal = document.getElementById('resetConfirmModal');
      if (show) {
        modal.classList.add('open');
      } else {
        modal.classList.remove('open');
      }
    }

    // 実際にデータを更地にする実働部
    function executeDataReset() {
      // 全刀剣データのカウント数を0にリセット
      allDataList = allDataList.map((item, index) => {
        // IDが一致するオリジナルのマスターデータを検索
        const defaultItem = defaultMasterList.find(d => d.id === item.id);
        
        return {
          id: item.id,
          name: item.name,
          count: 0, // カウントを0にリセット
          isEvent: false, // イベント限定は一斉解除
          // オリジナルデータが持つ本来のisDefaultフラグを安全に割り当てる
          isDefault: defaultItem ? (defaultItem.isDefault || false) : false,
          originalOrder: index
        };
      });
      // 限定ドロップ選択用の配列を完全に空にし、画面上のバッジを初期化
      selectedDropIds = []; // 選択中リストを空にする
      renderDropTags();     // 「限定ドロップが未選択です」の表示に戻す
      // 画面のヘッダー情報（催物名・期間）を初期状態へ戻す
      document.getElementById('evName').innerText = '・催物未設定・'; // ★「催物未設定」に統一
      document.getElementById('evPeriod').innerText = '　';
      // ログの箱のリセット
      actionLogList = [];
      localStorage.removeItem('刀剣カウンター_ACTION_LOG');
      // ローカルストレージを即時リフレッシュ
      localStorage.setItem('刀剣カウンター_LOCAL_EV_NAME', '催物未設定');
      localStorage.setItem('刀剣カウンター_LOCAL_EV_PERIOD', '');
      localStorage.setItem('刀剣カウンター_LOCAL_DATA', JSON.stringify(allDataList));
      // スプシ連携している場合は、リセット命令を裏側で飛ばす
      if (currentGasUrl) {
        const targetUrl = `${currentGasUrl}?action=reset`;
        fetch(targetUrl, { method: 'GET', mode: 'no-cors' })
        .catch(err => console.error("リセット同期通信失敗"));
      }
      // 検索ボックスの中身（文字）も綺麗さっぱり消去して、カウンター全体を正常な初期状態に戻す
      const searchBox = document.getElementById('searchBox');
      if (searchBox) searchBox.value = '';
      toggleClearBtn('searchBox', 'searchBoxClear');
      // カウンター画面と記録画面を「0」の状態で再描画
      renderCounter();
      renderRecord();
      // リセット通知
      showCustomToast("🌸 すべてのデータをリセットしました。");
      // 0.1秒後にモーダルをすべて閉じる
      setTimeout(function(){
      toggleResetModal(false);     // リセット確認モーダルを閉じる
      toggleConfigModal(false);    // 大元の設定モーダルも連動して閉じる
      }, 100);
    }

    // 画面中央にメッセージを浮き上がらせる共通関数
    function showCustomToast(message) {
      // すでにトーストが存在していれば一度消す
      let toast = document.getElementById('customToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'customToast';
        toast.className = 'custom-toast';
        document.body.appendChild(toast);
      }
      toast.innerText = message;
      // 10ミリ秒だけずらしてクラスを付与（CSSアニメーションを確実に発動させるため）
      setTimeout(() => { toast.classList.add('show'); }, 10);
      // 1.6秒後に自動でフワッと消す
      setTimeout(() => {
        toast.classList.remove('show');
      }, 1200);
    }


