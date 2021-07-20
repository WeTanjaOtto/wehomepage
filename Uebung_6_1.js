function identity_function(x){
	return x => x;
}

function addf(x){
	return y => x + y;
}

function add(x, y){
	return x + y;
}

function mul(x, y){
	return x * y;
}

/*
Schreiben Sie eine Funktion applyf(), die aus einer binären Funktion wie add(x,y) eine Funktion addfberechnet, die mit zwei Aufrufen das gleiche Ergebnis liefert, z.B. addf = applyf(add); addf(x)(y) soll add(x,y) liefern. Entsprechend applyf(mul)(5)(6) soll 30 liefern, wenn mul die binäre Multiplikation ist.
*/
function applyf(binaryFunction) {
	return function (x){ 
		return y => binaryFunction(x, y); 
	};

}

/*
Schreiben Sie eine Funktion curry() (von Currying), die eine binäre Funktion und ein Argument nimmt, um daraus eine Funktion zu erzeugen, die ein zweites Argument entgegen nimmt, z.B. add3 = curry(add, 3);add3(4) ergibt 7. curry(mul, 5)(6) ergibt 30.
*/

function curry(binaryFunction, x){
	return function (y) {
		return binaryFunction(x, y);
	}
}

/*
Erzeugen Sie die inc-Funktion mit Hilfe einer der Funktionen addf, applyf und curry aus den letzten Aufgaben, ohne die Funktion inc() selbst zu implementieren. (inc(x) soll immer x + 1 ergeben und lässt sich natürlich auch direkt implementieren. Das ist aber hier nicht die Aufgabe.) Vielleicht schaffen Sie es auch, drei Varianten der inc()-Implementierung zu schreiben?
*/

function inc_1(x){
	return curry(add, x)(1);
}

function inc_2(x){
	return addf(x)(1);
}

function inc_3(x){
	return applyf(add)(x)(1);
}

/*
Schreiben Sie eine Funktion methodize(), die eine binäre Funktion (z.B. add, mul) in eine unäre Methode verwandelt. Nach Number.prototype.add = methodize(add); soll (3).add(4) genau 7 ergeben.
*/

function methodize(binaryFunction){
	return function(y) {
		return binaryFunction(this, y);
	};
}


/*
Schreiben Sie eine Funktion demethodize(), die eine unäre Methode (z.B. add, mul) in eine binäre Funktion umwandelt. demethodize(Number.prototype.add)(5, 6) soll 11 ergeben.
*/

function demethodize(unaryFunction){
	return function(x, y){
		return unaryFunction.apply(x, [y]);
	};
}
//Number.prototype.add = methodize(add);
//console.log(demethodize(Number.prototype.add)(5, 6));

/*
Schreiben Sie eine Funktion twice(), die eine binäre Funktion in eine unäre Funktion umwandelt, die den einen Parameter zweimal weiter reicht. Z.B. var double = twice(add); double(11) soll 22 ergeben; var square = twice(mul); square(11) soll mul(11,11) === 121 ergeben.
*/

function twice(binaryFunction){
	return function(x){
		return binaryFunction(x, x);
	}
}

/*
Square
*/

function square(x){
	return x*x;
}

/*
Schreiben Sie eine Funktion composeu(), die zwei unäre Funktionen in eine einzelne unäre Funktion transformiert, die beide nacheinander aufruft, z.B. soll composeu(double, square)(3) genau 36 ergeben.
*/

function composeu(unaryFunction_1, unaryFunction_2){
	return function(x){
		x = unaryFunction_1(x);
		return unaryFunction_2(x);
	}
}

/*
Schreiben Sie eine Funktion composeb(), die zwei binäre Funktionen in eine einzelne Funktion transformiert, die beide nacheinander aufruft, z.B. composeb(add, mul)(2, 3, 5) soll 25 ergeben.
*/

function composeb(binaryFunction_1, binaryFunction_2){
	return function(x, y, z){
		y = binaryFunction_1(x, y);
		return binaryFunction_2(y, z);
	}
}

/*
Schreiben Sie eine Funktion once(), die einer anderen Funktion nur einmal erlaubt, aufgerufen zu werden, z.B. add_once = once(add); add_once(3, 4) soll beim ersten Mal 7 ergeben, beim zweiten Mal soll jedoch add_once(3, 4) einen Fehlerabbruch bewirken.
*/

var onceCalled = false;
function once(binaryFunction){
	return function (x, y) {
		if(!onceCalled){
			this.onceCalled = true;
			return binaryFunction(x, y);
		} else {
			console.log("Fehlermeldung");			
		}
	}
}

//add_once = once(add);
//console.log(add_once(3, 4));
//console.log(add_once(3, 4));
//console.log(add_once(3, 4));
//console.log(add_once(3, 4));


/*
Schreiben Sie eine Fabrik-Funktion counterf(), die zwei Funktionen inc() und dec() berechnet, die einen Zähler hoch- und herunterzählen. Z.B. counter = counterf(10); Dann soll counter.inc() 11 und counter.dec() wieder 10 ergeben.
*/

function counterf(count){
	return {
		inc: () => ++count, 
		dec: () => --count
	};
}

//counter = counterf(10);

//console.log(counter.inc());
//console.log(counter.dec());
//console.log(counter.dec());


/*
Schreiben Sie eine rücknehmbare Funktion revocable(), die als Parameter eine Funktion nimmt und diese bei Aufruf ausführt. Sobald die Funktion aber mit revoke() zurück genommen wurde, führt ein erneuter Aufruf zu einem Fehler. Z.B.
temp = revocable(alert);
temp.invoke(7); // führt zu alert(7);
temp.revoke();
temp.invoke(8); // Fehlerabbruch!
*/

function revocable(alert){
	return {
		revoked: false,
		invoke: function (data){
			if(!this.revoked){
				return alert(data);
			} else {
				console.log("Fehlermeldung");
			}
		},
		revoke: function (){
			this.revoked = true;
		}
	};
}

//temp = revocable(alert);
//console.log(temp.invoke(7));
//temp.revoke();
//console.log(temp.invoke(8));
/*
Implementieren Sie ein "Array Wrapper"-Objekt mit den Methoden get, store und append, so dass ein Angreifer keinen Zugriff auf das innere, private Array hat.

my_vector = vector();
my_vector.append(7);
my_vector.store(1, 8);
my_vector.get(0) // 7
my_vector.get(1) // 8
*/

//console.log(composeb(add, mul)(2, 3, 5));

//var double = twice(add);

//console.log(composeu(double, square)(3));
//console.log(double(11));

//Number.prototype.add = methodize(add);
//console.log((3).add(7));
//console.log(demethodize(add)(5, 6));

//var add = (a,b) => a + b;
//Number.prototype.mul = methodize(mul);
//console.log((3).mul(4));

//var a=2;
//var b=3;
//console.log(addf(a)(b));
//console.log("inc_1: "+inc_1(7));
//console.log("inc_2: "+inc_2(7));
//console.log("inc_3: "+inc_3(7));