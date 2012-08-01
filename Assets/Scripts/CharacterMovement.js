#pragma strict

var range = Vector2(1, 1);

private function GetRandomDestination() {
	return Vector3((Random.value - 0.5) * range.x, 0, (Random.value - 0.5) * range.y);
}

function Start() {
	var agent = GetComponent.<NavMeshAgent>();
	while (true) {
		agent.SetDestination(GetRandomDestination());
		yield;
		while (agent.remainingDistance > 0.02) yield;
		yield WaitForSeconds(1.5);
	}
}

function Update() {
	var agent = GetComponent.<NavMeshAgent>();
	animation.CrossFade(agent.velocity.magnitude > 0.5 ? "Walk" : "Idle");
}

function OnDrawGizmosSelected () {
    Gizmos.color = Color.green;
    Gizmos.DrawWireCube(Vector3.zero, Vector3(range.x, 0, range.y));
}
