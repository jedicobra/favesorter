
//<!--
//*********************************************************
//
// 評価するメンバーの名前のリスト
//
// この部分を変更して下さい。名前の削除・追加も可能です。
// 名前を引用符(")で括り、コンマ(,)で区切って下さい。
// 但し、リストの最後にはコンマを入れてはいけません。
//
// Add the names of the characters you wish to sort below.
//
// Names should be enclosed in quotation marks (").
// Names should be separated by a comma (,).
// However, do not put a comma at the end of the list.
//
//*********************************************************
//
// Code grabbed from the view-source: of 
// http://blingbling.konjiki.jp/bbst.html
// 
// I do not know where the original code is from, sorry.
// 
// Most of the translations are from Google Translate.
// Which is terrible, but what ya gonna do?
// 
//*********************************************************
var namMember = new Array(
//---------------------------------------------------------
"Chrono Trigger",
"Ratchet & Clank 3",
"Dragon Quest VIII",
"Persona 3",
"Batman: Arkham City",
"Mega Man X",
"Final Fantasy X",
"Half-Life",
"Smash Bros. Melee",
"Portal",
"Pokemon Gold/Silver",
"World Ends with You",
"Metal Gear Solid 4",
"Kingdom Hearts II",
"The Last of Us",
"Halo 3",
"Final Fantasy VI",
"Assassin's Creed II",
"Paper Mario: TYD",
"Tales of Symphonia",
"Star Wars: KOTOR",
"Xenogears",
"Zelda: The Wind Waker",
"Pokemon X/Y",
"Smash Bros. Wii U",
"Planescape: Torment",
"Super Mario Galaxy 2",
"Mass Effect",
"Minecraft",
"Halo: Combat Evolved",
"Final Fantasy VII",
"Journey",
"Super Mario Bros. 3",
"Age of Empires II",
"Pokemon Red/Blue",
"Tetris",
"Portal 2",
"Sonic the Hedgehog 2",
"Uncharted 2",
"The Walking Dead",
"Fallout 3",
"Life is Strange",
"Undertale",
"Mass Effect 3",
"GTA: Vice City",
"Final Fantasy VIII",
"Super Mario World",
"Animal Crossing New Leaf",
"Skyrim",
"Phoenix Wright",
"GoldenEye 007",
"Diablo II",
"Metroid Prime",
"Morrowind",
"Half-Life 2",
"Demon's Souls",
"Super Mario 64",
"Mario Kart 8",
"Final Fantasy Tactics",
"Resident Evil 2",
"Zelda: Twilight Princess",
"Skies of Arcadia",
"Persona 4",
"999",
"Zelda: Ocarina of Time",
"Hearthstone",
"Suikoden II",
"Monster Hunter 4U",
"Okami",
"Warcraft III",
"Final Fantasy IX",
"Kingdom Hearts",
"Xenoblade Chronicles",
"DK Country 2",
"Fire Emblem: Awakening",
"Super Mario Maker",
"Banjo-Kazooie",
"Baldur's Gate II",
"Castlevania: SOTN",
"Phoenix Wright: Trials",
"Zelda: A Link to the Past",
"Cave Story",
"Deus Ex",
"Final Fantasy IV",
"Metal Gear Solid V",
"Perfect Dark",
"Dark Souls",
"Civilization V",
"Super Metroid",
"Call of Duty 4",
"Super Mario Galaxy",
"Dragon Age: Origins",
"Bloodborne",
"Final Fantasy XII",
"Zelda: Majora's Mask",
"Valkyria Chronicles",
"Grand Theft Auto V",
"Shenmue",
"Oblivion",
"Super Mario RPG",
"GTA: San Andreas",
"Shovel Knight",
"World of Warcraft",
"Chrono Cross",
"The Witcher 3",
"Binding of Isaac Rebirth",
"Metal Gear Solid 2",
"Resident Evil",
"Fallout: New Vegas",
"BioShock Infinite",
"Resident Evil 4",
"Paper Mario",
"Metal Gear Solid",
"Splatoon",
"EarthBound",
"Borderlands 2",
"Shadow of the Colossus",
"Team Fortress 2",
"Red Dead Redemption",
"Bayonetta 2",
"Metal Gear Solid 3",
"Mother 3",
"BioShock",
"Silent Hill 2",
"Starcraft",
"Destiny",
"Mass Effect 2",
"Virtue's Last Reward"
);
//*********************************************************

var lstMember = new Array();
var parent = new Array();
var equal = new Array();
var rec = new Array();
var cmp1,cmp2;
var head1,head2;
var nrec;

var numQuestion;
var totalSize;
var finishSize;
var finishFlag;

//変数の初期化+++++++++++++++++++++++++++++++++++++++++++++
//(Variable initialization)++++++++++++++++++++++++++++++++
function initList(){
	var n = 0;
	var mid;
	var i;

	//ソートすべき配列(Sequence to be sorted)
	lstMember[n] = new Array();
	for (i=0; i<namMember.length; i++) {
		lstMember[n][i] = i;
	}
	parent[n] = -1;
	totalSize = 0;
	n++;

	for (i=0; i<lstMember.length; i++) {
		//要素数が２以上なら２分割し、(???)
		//分割された配列をlstMemberの最後に加える(???)
		if(lstMember[i].length>=2) {
			mid = Math.ceil(lstMember[i].length/2);
			lstMember[n] = new Array();
			lstMember[n] = lstMember[i].slice(0,mid);
			totalSize += lstMember[n].length;
			parent[n] = i;
			n++;
			lstMember[n] = new Array();
			lstMember[n] = lstMember[i].slice(mid,lstMember[i].length);
			totalSize += lstMember[n].length;
			parent[n] = i;
			n++;
		}
	}

	//保存用配列(Storage array)
	for (i=0; i<namMember.length; i++) {
		rec[i] = 0;
	}
	nrec = 0;

	//引き分けの結果を保存するリスト(???)
	//キー：リンク始点の値(???)
	// 値 ：リンク終点の値(???)
	for (i=0; i<=namMember.length; i++) {
		equal[i] = -1;
	}

	cmp1 = lstMember.length-2;
	cmp2 = lstMember.length-1;
	head1 = 0;
	head2 = 0;
	numQuestion = 1;
	finishSize = 0;
	finishFlag = 0;
}

//リストのソート+++++++++++++++++++++++++++++++++++++++++++
//(Sort the list)++++++++++++++++++++++++++++++++++++++++++
//flag：比較結果(flag: comparison result)
//  -1：左を選択(Select the left)
//   0：引き分け(Draws)
//   1：右を選択(Choose the Right)
function sortList(flag){
	var i;
	var str;

	//recに保存(Save the rec)
	if (flag<0) {
		rec[nrec] = lstMember[cmp1][head1];
		head1++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec-1]]!=-1) {
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		}
	}
	else if (flag>0) {
		rec[nrec] = lstMember[cmp2][head2];
		head2++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec-1]]!=-1) {
			rec[nrec] = lstMember[cmp2][head2];
			head2++;
			nrec++;
			finishSize++;
		}
	}
	else {
		rec[nrec] = lstMember[cmp1][head1];
		head1++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec-1]]!=-1) {
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		}
		equal[rec[nrec-1]] = lstMember[cmp2][head2];
		rec[nrec] = lstMember[cmp2][head2];
		head2++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec-1]]!=-1) {
			rec[nrec] = lstMember[cmp2][head2];
			head2++;
			nrec++;
			finishSize++;
		}
	}

	//片方のリストを走査し終えた後の処理
	//(Processing after it has finished scanning the list of one)
	if (head1<lstMember[cmp1].length && head2==lstMember[cmp2].length) {
		//リストcmp2が走査済 - リストcmp1の残りをコピー
		//(Cmp2 list is scanned - copy the rest of the list cmp1)
		while (head1<lstMember[cmp1].length){
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		}
	}
	else if (head1==lstMember[cmp1].length && head2<lstMember[cmp2].length) {
		//リストcmp1が走査済 - リストcmp2の残りをコピー
		//(Cmp1 list is scanned - copy the rest of the list cmp2)
		while (head2<lstMember[cmp2].length){
			rec[nrec] = lstMember[cmp2][head2];
			head2++;
			nrec++;
			finishSize++;
		}
	}

	//両方のリストの最後に到達した場合は
	//(If you reach the end of the list of both)
	//親リストを更新する(I want to update the parent list)
	if (head1==lstMember[cmp1].length && head2==lstMember[cmp2].length) {
		for (i=0; i<lstMember[cmp1].length+lstMember[cmp2].length; i++) {
			lstMember[parent[cmp1]][i] = rec[i];
		}
		lstMember.pop();
		lstMember.pop();
		cmp1 = cmp1-2;
		cmp2 = cmp2-2;
		head1 = 0;
		head2 = 0;

		//新しい比較を行う前にrecを初期化
		//(Initialize the rec before you make a new comparison)
		if (head1==0 && head2==0) {
			for (i=0; i<namMember.length; i++) {
				rec[i] = 0;
			}
			nrec = 0;
		}
	}

	if (cmp1<0) {
		str = "Battle No."+(numQuestion-1)+"<br>"+Math.floor(finishSize*100/totalSize)+"% sorted.";
		document.getElementById("battleNumber").innerHTML = str;

		showResult();
		finishFlag = 1;
	}
	else {
		showImage();
	}
}

//結果の表示+++++++++++++++++++++++++++++++++++++++++++++++
//(View Results)+++++++++++++++++++++++++++++++++++++++++++
function showResult() {
	var ranking = 1;
	var sameRank = 1;
	var str = "";
	var i;

	str += "<table style=\"width:200px; font-size:12px; line-height:120%; margin-left:auto; margin-right:auto; border:1px solid #000; border-collapse:collapse\" align=\"center\">";
	str += "<tr><td style=\"color:#ffffff; background-color:#000; text-align:center;\">Rank<\/td><td style=\"color:#ffffff; background-color:#000; text-align:center;\">Game<\/td><\/tr>";

	for (i=0; i<namMember.length; i++) {
		str += "<tr><td style=\"border:1px solid #000; text-align:right; padding-right:5px;\">"+ranking+"<\/td><td style=\"border:1px solid #000; padding-left:5px;\">"+namMember[lstMember[0][i]]+"<\/td><\/tr>";
		if (i<namMember.length-1) {
			if (equal[lstMember[0][i]]==lstMember[0][i+1]) {
				sameRank++;
			} else {
				ranking += sameRank;
				sameRank = 1;
			}
		}
	}
	str += "<\/table>";

	document.getElementById("resultField").innerHTML = str;
}

//比較する２つ要素の表示+++++++++++++++++++++++++++++++++++
//(Display of two elements to be compared)+++++++++++++++++
function showImage() {
	var str0 = "Battle No."+numQuestion+"<br>"+Math.floor(finishSize*100/totalSize)+"% sorted.";
	var str1 = ""+toNameFace(lstMember[cmp1][head1]);
	var str2 = ""+toNameFace(lstMember[cmp2][head2]);

	document.getElementById("battleNumber").innerHTML = str0;
	document.getElementById("leftField").innerHTML = str1;
	document.getElementById("rightField").innerHTML = str2;

	numQuestion++;
}

//数値を名前（顔文字）に変換+++++++++++++++++++++++++++++++
//Convert name to (emoticons) a number+++++++++++++++++++++

function toNameFace(n){
	var str = namMember[n];

	//顔文字を追加する場合は以下のコメントアウトを外す
	//namMemberのインデックスと矛盾しないように注意
	/*
	str += "<br>────<br>";
	switch(n) {
		//case -1 はサンプルなので削除すること
		case -1: str+="（ ´∀｀）";break;
		default: str+=""+n;
	}
	*/
	return str;
}
//-->
