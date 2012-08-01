#pragma strict

class AssetBundleTool {
	@MenuItem("Bundler/Build AssetBundle From Selection")
	static function ExportAssetBundle() {
		var path = EditorUtility.SaveFilePanel("Save AssetBundle", "", "assetbundle", "unity3d");
		if (path) {
			var selection = Selection.GetFiltered(typeof(Object), SelectionMode.DeepAssets);
			BuildPipeline.BuildAssetBundle(Selection.activeObject, selection, path, BuildAssetBundleOptions.CollectDependencies | BuildAssetBundleOptions.CompleteAssets, EditorUserBuildSettings.activeBuildTarget);
		}
	}
}
