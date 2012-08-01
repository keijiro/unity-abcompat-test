#pragma strict

var files : System.IO.FileInfo[];

function Start() {
	files = System.IO.DirectoryInfo(Application.streamingAssetsPath).GetFiles("*.unity3d");
}

function OnGUI() {
	for (file in files) {
		if (GUILayout.Button(file.Name)) {
			StartCoroutine(LoadAndInstantiate(file.Name));
		}
	}
}

private function LoadAndInstantiate(filename : String) {
	var url = "file://" + System.IO.Path.Combine(Application.streamingAssetsPath, filename);
	var www = WWW(url);
	yield www;
	
	var bundle = www.assetBundle;
	if (bundle) Instantiate(bundle.mainAsset);

	www.Dispose();
}
