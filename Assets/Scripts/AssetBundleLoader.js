#pragma strict

var files : System.IO.FileInfo[];

function Start() {
	files = System.IO.DirectoryInfo(Application.streamingAssetsPath).GetFiles("*.unity3d");
}

function OnGUI() {
	GUILayout.BeginArea(Rect(10, 10, 200, Screen.height - 20));
	GUILayout.BeginVertical();
	for (file in files) {
		if (GUILayout.Button(file.Name, GUILayout.ExpandHeight(true))) {
			StartCoroutine(LoadAndInstantiate(file.Name));
		}
	}
	GUILayout.EndVertical();
	GUILayout.EndArea();
}

private function LoadAndInstantiate(filename : String) {
	var url = "file://" + System.IO.Path.Combine(Application.streamingAssetsPath, filename);
	var www = WWW(url);
	yield www;
	
	var bundle = www.assetBundle;
	if (bundle) Instantiate(bundle.mainAsset);

	www.Dispose();
}
