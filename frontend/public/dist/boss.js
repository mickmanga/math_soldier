"use strict";
(() => {
  // src/challenge.ts
  var goBackToMountain = (event) => {
    window.location.href = `/discovery${hardMode ? "?started=true" : ""}`;
  };
  var getUrlParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
  var MAPS = [];
  var heroContainer = document.getElementById("hero_container");
  var heroImage = document.getElementById("heroImg");
  var swordSlashImg = document.getElementById(
    "sword_slash"
  );
  var scoreContainer = document.getElementById("score_value");
  var answerDataContainer = document.getElementById("answer_data_container");
  var answerDataValue = document.getElementById("answer_data_value");
  var scoreMalusContainer = document.getElementById("score_malus_container");
  var scoreMalusDetail = document.getElementById("score_malus_detail");
  var scoreRewardContainer = document.getElementById("score_reward_container");
  var scoreRewardDetail = document.getElementById("score_reward_detail");
  var ANIMTION_HERO_RUN_DURATION_BETWEEN_FRAMES_IN_MS = 100;
  var heroInTheRedZone = false;
  var enemyViewPoint = document.getElementsByClassName(
    "enemyViewPoint"
  )[0];
  var enemyViewPointLogo = document.getElementById(
    "enemyViewPointLogo"
  );
  var enemyViewPointTile1 = document.getElementById(
    "enemyViewPointTile1"
  );
  var enemyViewPointTile2 = document.getElementById(
    "enemyViewPointTile2"
  );
  var enemyViewPointTile3 = document.getElementById(
    "enemyViewPointTile3"
  );
  var enemyViewPointTile4 = document.getElementById(
    "enemyViewPointTile4"
  );
  var viewPointTiles = [
    enemyViewPointTile1,
    enemyViewPointTile2,
    enemyViewPointTile3,
    enemyViewPointTile4
  ];
  var updateEnemyViewPointDisplay = () => {
    viewPointTiles.forEach(
      (tile) => tile.style.background = heroInTheRedZone ? "rgba(204, 40, 40, 0.514)" : "rgba(40, 108, 204, 0.514)"
    );
    enemyViewPointLogo.src = `assets/challenge/millescaneous/${heroInTheRedZone ? "careful" : "vision"}.png`;
  };
  var runAudio = document.getElementById("run_audio");
  var swordAudio = document.getElementById("sword_audio");
  var laserdAudio = document.getElementById("laser_audio");
  var epicAudio = document.getElementById(
    getUrlParameter("mode") === "hard" ? "hard_epic_audio" : "epic_audio"
  );
  var bassAudio = document.getElementById("bass_audio");
  var fireBackgroundAudio = document.getElementById(
    "fire_background_audio"
  );
  var electricityAudio = document.getElementById(
    "electricity_audio"
  );
  var transformationScreamAudio = document.getElementById(
    "transformation_scream_audio"
  );
  var hurtAudio = document.getElementById(
    "hero_hurt_audio"
  );
  var transformedEpicAudio = document.getElementById(
    "transformed_epic_audio"
  );
  var transformationOffAudio = document.getElementById(
    "transformation_off_audio"
  );
  var progressBar = document.getElementsByClassName(
    "progress"
  )[0];
  var bombAudio = document.getElementById("bomb_audio");
  swordAudio.volume = 0.65;
  bombAudio.volume = 0.12;
  electricityAudio.volume = 0.7;
  transformationScreamAudio.volume = 0.25;
  hurtAudio.volume = 0.025;
  runAudio.volume = 0.7;
  var currentSubject = null;
  var currentSubjectTotal = 0;
  var swordReach = window.innerWidth * 0.6;
  var gameLaunched = false;
  var TRANSFORMED_BONUS_RATIO = 1;
  var REWARD_UNIT = 1;
  var transformedAlready = false;
  var REWARD_TIMEOUT_DURATION = 1e3;
  var KILLED_ENEMY_REWARD = 30;
  var rewardStreak = 1;
  var hardMode = false;
  var TRANSFORMATION_THRESHOLD = hardMode ? 1e8 : 20;
  var preTransformed = false;
  var gameFinished = false;
  var runStopped = false;
  var score = 0;
  var heroHurt = false;
  var heroIsAlive = true;
  var lifePoints = { max: 4, value: 4 };
  var INVISIBILITY_DURATION_IN_MILLISECONDS = 2e3;
  var invisible = false;
  var ennemiesOnScreen = [];
  var enemiesComingTimeout = null;
  var transformed = false;
  var currentMalusContainerTimeout = null;
  var currentRewardContainerTimeout = null;
  var currentTransformationRewardContainerTimeout = null;
  var Answer = class {
    constructor(data, good) {
      this.data = data;
      this.good = good;
    }
  };
  var Enemy = class {
    constructor(element, answer) {
      this.collideable = true;
      this.element = element;
      this.answer = answer;
    }
  };
  var GAME_TIMEOUTS = {
    [0 /* HERO */]: [],
    [1 /* ENEMY */]: []
  };
  var STATS = {
    title: "statistics",
    good: [
      new Answer(
        "Etendue = Valeur maximale - Valeur minimale d'un jeu de donn\xE9e",
        true
      ),
      new Answer(
        "Le mode est la valeur la plus fr\xE9quente dans un ensemble de donn\xE9es.",
        true
      ),
      new Answer(
        "La variance mesure \xE0 quel point les donn\xE9es d'un ensemble sont dispers\xE9es par rapport \xE0 la moyenne.",
        true
      ),
      new Answer("L'\xE9cart type est la racine carr\xE9e de la variance", true),
      new Answer(
        "Les statistiques descriptives sont une des deux cat\xE9gories des statistiques",
        true
      ),
      new Answer(
        "Les statistiques Inf\xE9rentielles sont une des deux cat\xE9gories des statistiques",
        true
      ),
      new Answer(
        "Les statistiques descriptives r\xE9sument ou d\xE9crivent les caract\xE9ristiques d'un ensemble de donn\xE9es",
        true
      ),
      new Answer(
        "Les statistiques inf\xE9rentielles font des inf\xE9rences et des pr\xE9dictions sur une population \xE0 partir d'un \xE9chantillon de donn\xE9es",
        true
      ),
      new Answer("Un ensemble de donn\xE9es peut avoir plusieurs modes", true),
      new Answer("Un ensemble de donn\xE9es peut avoir 0 modes", true)
    ],
    bad: [
      new Answer("Etendue = la Valeur minimale d'un jeu de donn\xE9e", false),
      new Answer(
        "Le mode est la valeur la moins r\xE9pendue dans un ensemble de donn\xE9es.",
        false
      ),
      new Answer(
        "La variance mesure le nombre de diff\xE9rence entre deux jeux de donn\xE9es",
        false
      ),
      new Answer(
        "L'\xE9cart type est l'\xE9cart entre le premier et le dernier \xE9l\xE9ment d'un jeu de donn\xE9e ",
        false
      ),
      new Answer(
        "Les statistiques cumulatives sont une des deux cat\xE9gories des statistiques",
        false
      ),
      new Answer(
        "Les statistiques proclamatives sont une des deux cat\xE9gories des statistiques",
        false
      ),
      new Answer("Les statistiques descriptives n'existent pas", false),
      new Answer(
        "les statistique inf\xE9rentielles d\xE9crivent les caract\xE9ristiques d'un ensemble de donn\xE9es",
        false
      ),
      new Answer("Un ensemble de donn\xE9es ne peut avoir qu'un mode", false),
      new Answer("Un ensemble de donn\xE9es ne peut pas avoir 0 mode", false)
    ]
  };
  var VECTORS = {
    title: "Additions",
    good: [
      new Answer("un vecteur est not\xE9 AB -> ou u ->", true),
      new Answer(
        "La norme d'un vecteur, not\xE9e ||AB->|| est la longueur du vecteur AB -> autrement dit, la distance entre les points A et B.",
        true
      ),
      new Answer(
        "Le point d'origine du vecteur AB -> (ici le point A) est le point de d\xE9part qui en caract\xE9rise le sens",
        true
      ),
      new Answer(
        "Le point d'extr\xE9mit\xE9 de AB -> est le point d'arriv\xE9e  (ici le point B) qui en caract\xE9rise le sens",
        true
      ),
      new Answer("Le vecteur oppos\xE9 du vecteur AB > est BA -> ou -AB -> ", true),
      new Answer(
        "lorsque deux points AB sont confondus, on dit que AB -> est un vecteur nul",
        true
      )
    ],
    bad: [
      new Answer(
        "Sens, et direction sont synonymes lorsqu'on parle de vecteurs",
        false
      ),
      new Answer(
        "Le point d'extremit\xE9 est toujours \xE9gal au point d'arriv\xE9e d'un vecteur",
        false
      ),
      new Answer(
        "Le point d'extremit\xE9 represente le point de d\xE9part du vecteur",
        false
      ),
      new Answer(
        "Un vecteur ne peut pas \xEAtre nul, sinon ce n'est pas un vecteur",
        false
      )
    ]
  };
  var charlotte_memories = {
    title: "Arithmetic",
    good: [
      new Answer("(27/07) j'ai \xE9t\xE9 au march\xE9", true),
      new Answer("(27/07) ,  mon oncle m'a d\xE9pos\xE9 en voiture", true),
      new Answer("(samedi 27/07) j'ai souhait\xE9 bon anniversaire \xE0 Michael", true),
      new Answer("(samedi 27/07) Je suis sorti me faire coiffer", true),
      new Answer("(samedi 27/07) Je suis sorti \xE0 une r\xE9union", true),
      new Answer("(samedi 27/07) Je suis rentr\xE9e \xE0 3h du matin", true),
      new Answer("(samedi 27/07) J'ai bu un peu de champagne", true),
      new Answer("(samedi 27/07) j'ai mang\xE9 un peu d'ekoki/poisson", true),
      new Answer(
        "(samedi 27/07) J'\xE9tais habill\xE9e en pantalon bleu/blanc, sac bleu",
        true
      ),
      new Answer("(27/07) Mon oncle m'a d\xE9pos\xE9e en voiture", true)
    ],
    bad: [
      new Answer("(27/07) Je suis all\xE9 au restaurant chez Julie", false),
      new Answer("(samedi 27/07) Maxime est venu \xE0 la maison", false),
      new Answer("(samedi 27/07) Je suis all\xE9 voir ma soeur ", false),
      new Answer("(samedi 27/07) J'ai regard\xE9 un reportage sur Poutine", false),
      new Answer("(samedi 27/07) j'ai mang\xE9 des myrtilles", false),
      new Answer("(samedi 27/07) J'ai bu du whisky avec du coca", false),
      new Answer(
        "(samedi 27/07) Des ouvriers sont venus changer les vitres",
        false
      )
    ]
  };
  var Mike_memory = {
    title: "Arithmetic",
    good: [
      new Answer(
        "(26/07) Tu as regard\xE9 une interview de l'adjoint de Pierre Sage",
        true
      ),
      new Answer("(26/07) Tu as pris un caf\xE9 dans une tasse blanche", true),
      new Answer("(26/07) Tu as flipp\xE9 sur ta peau oendant des heures", true),
      new Answer("(26/07) Tu as trouv\xE9 une bouteille de spray", true),
      new Answer("(26/07) Tu as chang\xE9 tes draps", true),
      new Answer("(26/07) Tu as nettoy\xE9 le sol de la cuisine", true),
      new Answer(
        "(26/07) Tu as regard\xE9 une interview de l'adjoint de Pierre Sage",
        true
      ),
      new Answer("(26/07) Tu t'es fait retirer les fils la veille", true),
      new Answer("(26/07) Tu as lu un mail d'AMELI", true)
    ],
    bad: [
      new Answer(
        "(26/07) Tu as regard\xE9 une interview de l'adjoint de Pierre Sage",
        false
      ),
      new Answer("(26/07) Tu as pris un th\xE9", false),
      new Answer("(26/07) Tu as mang\xE9 mcdo", false),
      new Answer("(26/07) Tu as bu du whisky", false),
      new Answer("(26/07) Tu as regard\xE9 l'interview de Moussa Niakhat\xE9", false),
      new Answer("(26/07) Tu as appel\xE9 max", false),
      new Answer("(26/07) Tu n'es pas all\xE9 sur twitter", false),
      new Answer("(26/07) Tu t'es fait retirer les fils il y'a 2 jours", false)
    ]
  };
  var ALGEBRA_INTRO = {
    title: "Algebra Introduction",
    good: [
      new Answer("The equation 3x + 2 = 11 can be solved by first subtracting 2 from both sides to get 3x = 9, and then dividing by 3 to find that x = 3.", true),
      new Answer("The factorization of the quadratic equation x^2 - 5x + 6 is (x - 2)(x - 3), because multiplying these factors back out gives the original expression.", true),
      new Answer("To solve 2x + 5 = 17, first subtract 5 from both sides to get 2x = 12, and then divide both sides by 2 to get x = 6.", true),
      new Answer("If x - 4 = 9, you can solve for x by adding 4 to both sides, which gives you the solution x = 13.", true),
      new Answer("The equation 2x - 1 = 7 can be solved by adding 1 to both sides to get 2x = 8, then dividing by 2 to find that x = 4.", true),
      new Answer("The degree of the polynomial 4x^3 + 2x is 3 because the highest exponent of the variable x is 3, making this a cubic polynomial.", true),
      new Answer("The linear function f(x) = 2x + 3 has a slope of 2 and a y-intercept of 3, which means its graph is a straight line with a constant rate of change.", true),
      new Answer("Using the distributive property, we know that (a + b)^2 expands to a^2 + 2ab + b^2, which can be verified by multiplying (a + b)(a + b).", true),
      new Answer("When you add 5x and 3x, you combine the like terms to get 8x, because both terms have the same variable raised to the same power.", true),
      new Answer("The expression (x + 4)(x - 4) is an example of the difference of squares, which simplifies to x^2 - 16 according to the formula a^2 - b^2 = (a + b)(a - b).", true),
      new Answer("The quadratic expression x^2 - 9 is a difference of squares, which factors into (x + 3)(x - 3) because the square root of 9 is 3.", true),
      new Answer("To solve the equation 2x + 4 = 10, first subtract 4 from both sides to get 2x = 6, then divide by 2 to find that x = 3.", true),
      new Answer("A polynomial of degree 3, such as 4x^3 - 3x + 2, is called a cubic polynomial because the highest power of the variable x is 3.", true),
      new Answer("In the linear equation y = mx + b, the value of m represents the slope of the line, which is the rate at which y changes with respect to x.", true),
      new Answer("A quadratic function, such as f(x) = x^2, graphs as a parabola and is defined by having the highest power of x being 2.", true),
      new Answer("The quadratic expression x^2 + 2x + 1 can be factored as (x + 1)^2 because it represents a perfect square trinomial.", true),
      new Answer("The greatest common factor (GCF) of 12x and 8 is 4, because 4 is the largest number that divides evenly into both 12 and 8.", true),
      new Answer("To solve the system of equations 2x + 3y = 12 and x - y = 2, you can use substitution or elimination to find that x = 4 and y = 2.", true),
      new Answer("The function f(x) = 3x + 5 is linear, meaning that as x increases by 1, f(x) increases by 3. The graph of this function is a straight line with a slope of 3.", true),
      new Answer("The solution to the equation 5x = 15 is x = 3, which is found by dividing both sides of the equation by 5 to isolate x.", true),
      new Answer("When solving for x in the equation (x + 2)(x - 5) = 0, the solutions are x = -2 and x = 5, because these values make each factor equal to zero.", true)
    ],
    bad: [
      new Answer("The equation 3x + 2 = 11 can be solved by dividing both sides by 3 first, then subtracting 2 to get x = 2.", false),
      new Answer("The factorization of x^2 - 5x + 6 is (x + 2)(x + 3), because adding 2 and 3 gives 5.", false),
      new Answer("If x - 4 = 9, the solution is x = 5 because 9 minus 4 equals 5.", false),
      new Answer("In the polynomial 4x^3 + 2x, the degree is 2 because the highest variable term is 2x.", false),
      new Answer("The linear function f(x) = 2x + 3 has a slope of 3 and y-intercept of 2, which means the slope is always the second number.", false),
      new Answer("(a + b)^2 equals a^2 + b^2 because you simply square each term inside the parentheses individually.", false),
      new Answer("When you add 5x and 3x, you get 5x + 3x, because they are different terms that cannot be combined.", false),
      new Answer("The expression (x + 4)(x - 4) simplifies to x^2 + 16 because you add the terms together.", false),
      new Answer("The solution to the equation 2x + 4 = 10 is x = 8, because dividing by 2 gives you 8.", false),
      new Answer("In the equation y = mx + b, b represents the slope of the line because it comes after the x term.", false),
      new Answer("A quadratic function like f(x) = x^2 has no slope, because it is a horizontal line.", false),
      new Answer("The greatest common factor of 12x and 8 is 2, because 2 divides both 12 and 8 evenly.", false),
      new Answer("The system of equations 2x + 3y = 12 and x - y = 2 can be solved by adding both equations to get x + y = 14.", false),
      new Answer("The solution to 5x = 15 is x = 5, because dividing 15 by 5 gives you 5.", false),
      new Answer("When solving (x + 2)(x - 5) = 0, there is only one solution, x = 0, because multiplying them gives zero.", false),
      new Answer("In the equation x^2 - 9 = 0, there are no solutions because there is no number that makes x^2 equal to 9.", false),
      new Answer("To solve the equation 3x + 5 = 20, you can subtract 5 from 20 to get x = 15.", false),
      new Answer("The function f(x) = 2x + 3 is not linear because it involves adding 3 to the x term.", false),
      new Answer("In a quadratic function like f(x) = x^2 + 3x, the graph is always a straight line because it contains only one variable.", false)
    ]
  };
  var AUTHOR_INFO = {
    title: "About the Author - David C. Lay",
    good: [
      new Answer("David C. Lay holds a B.A. from Aurora University and an M.A. and Ph.D. from UCLA.", true),
      new Answer("David Lay has been an educator and research mathematician since 1966.", true),
      new Answer("He has published more than 30 research articles on functional analysis and linear algebra.", true),
      new Answer("David Lay is a founding member of the NSF-sponsored Linear Algebra Curriculum Study Group.", true),
      new Answer("He received the title of Distinguished Scholar\u2013Teacher of the University of Maryland in 1996.", true),
      new Answer("In 1994, he was awarded for Distinguished College or University Teaching of Mathematics by the Mathematical Association of America.", true),
      new Answer("David Lay has served as a visiting professor at the University of Kaiserslautern, Germany.", true),
      new Answer("He is a member of the American Mathematical Society and the International Linear Algebra Society.", true),
      new Answer("David Lay has co-authored several mathematics texts, including 'Introduction to Functional Analysis.'", true),
      new Answer("He has contributed to modernizing the linear algebra curriculum.", true),
      new Answer("David Lay has been an educator mostly at the University of Maryland, College Park.", true),
      new Answer("He has also worked at the Free University in Amsterdam.", true),
      new Answer("David Lay has been involved in the Association of Christians in the Mathematical Sciences since 1992.", true),
      new Answer("He has received four university awards for teaching excellence.", true),
      new Answer("David Lay has served on the national board of the Association of Christians in the Mathematical Sciences.", true)
    ],
    bad: [
      new Answer("David C. Lay holds a B.A. from Yale University and an M.A. from Harvard University.", false),
      new Answer("He has published over 100 research articles on number theory.", false),
      new Answer("David Lay has never been a professor at any university.", false),
      new Answer("He was awarded the title of Distinguished Scholar\u2013Teacher of Harvard University in 1996.", false),
      new Answer("David Lay has no involvement with any mathematics societies.", false),
      new Answer("He has only taught mathematics since 1990.", false),
      new Answer("David Lay is known for his work exclusively in geometry.", false),
      new Answer("He received the Outstanding Alumnus award from Stanford University.", false),
      new Answer("David Lay is a founding member of the National Mathematics Society.", false),
      new Answer("He has never published any research articles on linear algebra.", false),
      new Answer("David Lay has only worked in the field of applied mathematics.", false),
      new Answer("He has not been recognized for his teaching excellence at any institution.", false),
      new Answer("David Lay served as a visiting professor in the United Kingdom only.", false),
      new Answer("He has authored a textbook solely on calculus.", false),
      new Answer("David Lay's contributions are limited to the field of statistics.", false)
    ]
  };
  var LINEAR_ALGEBRA_BASICS = {
    title: "Understanding Lines and Intercepts",
    good: [
      new Answer("The y-intercept is where a line crosses the vertical axis (the y-axis).", true),
      new Answer("The slope tells you how steep a line is, describing how much it rises or falls as you move along the x-axis.", true),
      new Answer("A two-variable equation creates a straight line when graphed.", true),
      new Answer("To find the y-intercept, set the x-variable to 0 and see where the line meets the y-axis.", true),
      new Answer("In slope-intercept form, the y-intercept is the number at the end (without an x).", true),
      new Answer("The slope is the number in front of x and shows how the line rises or falls as you move to the right.", true),
      new Answer("A slope of 0 means the line is flat and doesn\u2019t rise or fall.", true),
      new Answer("If the y-intercept is positive, the line crosses above the origin.", true),
      new Answer("A negative slope means the line falls as you move to the right.", true),
      new Answer("When x is zero, the value of y gives you the y-intercept.", true),
      new Answer("Linear equations describe straight lines because the variables have no exponents.", true),
      new Answer("The slope can be thought of as rise over run, describing how much y changes for each change in x.", true),
      new Answer("A slope of 1 means the line rises one unit for each unit you move to the right.", true),
      new Answer("The y-intercept is the point (0, b) in the equation y = mx + b.", true),
      new Answer("The slope can be found by picking two points on the line and dividing the change in y by the change in x.", true)
    ],
    bad: [
      new Answer("The y-intercept is where the line crosses the x-axis.", false),
      new Answer("A two-variable equation always creates a curve, like a parabola.", false),
      new Answer("The slope only tells you where the line starts, not how it moves.", false),
      new Answer("The y-intercept can only be found by solving for x, not by looking at the equation.", false),
      new Answer("The slope is always 1, and all lines are equally steep.", false),
      new Answer("In slope-intercept form, the y-intercept is always the number attached to x.", false),
      new Answer("A negative y-intercept means the line never crosses the y-axis.", false),
      new Answer("The y-intercept changes based on where the line crosses the x-axis.", false),
      new Answer("A slope of zero means the line falls straight down.", false),
      new Answer("The y-intercept cannot be found from a graph.", false),
      new Answer("The slope is measured by how high the line starts.", false),
      new Answer("If the slope is negative, the line doesn\u2019t cross the y-axis.", false),
      new Answer("The y-intercept is always a positive number.", false),
      new Answer("All lines have the same y-intercept, regardless of the equation.", false),
      new Answer("The slope only matters for vertical lines, not diagonal ones.", false),
      new Answer("A two-variable equation can describe any shape, even circles and triangles.", false)
    ]
  };
  var MATHS_ARITHMETIC = {
    title: "Advanced Arithmetic",
    good: [
      new Answer("12 + 15 = 27", true),
      new Answer("24 + 36 = 60", true),
      new Answer("45 - 18 = 27", true),
      new Answer("30 / 5 = 6", true),
      new Answer("7 * 8 = 56", true),
      new Answer("18 + 12 = 30", true),
      new Answer("50 - 22 = 28", true),
      new Answer("15 * 3 = 45", true),
      new Answer("100 / 4 = 25", true),
      new Answer("32 - 14 = 18", true),
      new Answer("9 + 16 = 25", true),
      new Answer("14 * 2 = 28", true),
      new Answer("36 / 6 = 6", true),
      new Answer("27 - 9 = 18", true),
      new Answer("8 * 7 = 56", true),
      new Answer("64 / 8 = 8", true),
      new Answer("11 + 29 = 40", true),
      new Answer("21 + 34 = 55", true),
      new Answer("90 - 45 = 45", true),
      new Answer("5 * 6 = 30", true),
      new Answer("8 + 37 = 45", true)
    ],
    bad: [
      new Answer("12 + 15 = 30", false),
      new Answer("24 + 36 = 50", false),
      new Answer("45 - 18 = 20", false),
      new Answer("30 / 5 = 5", false),
      new Answer("7 * 8 = 54", false),
      new Answer("18 + 12 = 40", false),
      new Answer("50 - 22 = 20", false),
      new Answer("15 * 3 = 50", false),
      new Answer("100 / 4 = 15", false),
      new Answer("32 - 14 = 25", false),
      new Answer("9 + 16 = 20", false),
      new Answer("14 * 2 = 30", false),
      new Answer("36 / 6 = 5", false),
      new Answer("27 - 9 = 15", false),
      new Answer("8 * 7 = 60", false),
      new Answer("64 / 8 = 10", false),
      new Answer("11 + 29 = 50", false),
      new Answer("21 + 34 = 60", false),
      new Answer("90 - 45 = 50", false),
      new Answer("5 * 6 = 25", false),
      new Answer("8 + 37 = 50", false)
    ]
  };
  var MATHS_MEDIUM = {
    title: "Additions",
    good: [
      new Answer("10+5=15", true),
      new Answer("6X6=36", true),
      new Answer("10X5+7=57", true),
      new Answer("10+12=22", true),
      new Answer("10-4=6", true),
      new Answer("6x3=18", true),
      new Answer("10-2=2x2x2", true),
      new Answer("10X3=15x2", true),
      new Answer("8+8=4X4", true),
      new Answer("10X5=25X2", true),
      new Answer("6x13=78", true),
      new Answer("10+10.5=20.5", true),
      new Answer("10X19+20=210", true),
      new Answer("8+16=24", true),
      new Answer("10+5=15", true),
      new Answer("6X6=36", true),
      new Answer("10X5+7=57", true),
      new Answer("10+12=22", true),
      new Answer("10-4=6", true),
      new Answer("6x3=18", true),
      new Answer("10-2=2x2x2", true),
      new Answer("10X3=15x2", true),
      new Answer("8+8=4X4", true),
      new Answer("10X5=25X2", true),
      new Answer("6x13=78", true),
      new Answer("10+10.5=20.5", true),
      new Answer("10X19+20=210", true),
      new Answer("8+16=24", true),
      new Answer("10+5=15", true),
      new Answer("6X6=36", true),
      new Answer("10X5+7=57", true),
      new Answer("10+12=22", true),
      new Answer("10-4=6", true),
      new Answer("6x3=18", true),
      new Answer("10-2=2x2x2", true),
      new Answer("10X3=15x2", true),
      new Answer("8+8=4X4", true),
      new Answer("10X5=25X2", true),
      new Answer("6x13=78", true),
      new Answer("10+10.5=20.5", true),
      new Answer("10X19+20=210", true),
      new Answer("8+16=24", true),
      new Answer("10+5=15", true),
      new Answer("6X6=36", true),
      new Answer("10X5+7=57", true),
      new Answer("10+12=22", true),
      new Answer("10-4=6", true),
      new Answer("6x3=18", true),
      new Answer("10-2=2x2x2", true),
      new Answer("10X3=15x2", true),
      new Answer("8+8=4X4", true),
      new Answer("10X5=25X2", true),
      new Answer("6x13=78", true),
      new Answer("10+10.5=20.5", true),
      new Answer("10X19+20=210", true),
      new Answer("8+16=24", true)
    ],
    bad: [
      new Answer("10+15=20", false),
      new Answer("6X3=21", false),
      new Answer("10x60=6000", false),
      new Answer("12x12.5=250", false),
      new Answer("15x2=20", false),
      new Answer("6x4=20", false),
      new Answer("10-5=20", false),
      new Answer("100X2=400", false),
      new Answer("8+22=40", false),
      new Answer("10X3=1000/100", false),
      new Answer("10X15=145", false),
      new Answer("6x100=6000", false),
      new Answer("10X10=1000", false),
      new Answer("19-2.5 = 17.5", false),
      new Answer("8+17=24", false)
    ]
  };
  var getNextAnswer = () => {
    const randVal = Math.random() > 0.5;
    if (!currentSubject) {
      console.log("there is no subject");
      defineCurrentSubject(hardMode ? LINEAR_ALGEBRA_BASICS : LINEAR_ALGEBRA_BASICS);
    }
    const getAndRemoveSubject = (index, list) => {
      let foundElement = null;
      for (let elementIndex = 0; elementIndex < list.length; elementIndex++) {
        let element = list[elementIndex];
        if (elementIndex === index) {
          list.splice(elementIndex, 1);
          foundElement = element;
          break;
        }
      }
      if (foundElement === null) {
        console.log("error => we couldnt find an element in the answers list");
      }
      return foundElement;
    };
    if (randVal) {
      return (currentSubject == null ? void 0 : currentSubject.good.length) ? getAndRemoveSubject(
        Math.round(Math.random() * (currentSubject.good.length - 1)),
        currentSubject.good
      ) : (currentSubject == null ? void 0 : currentSubject.bad.length) ? getAndRemoveSubject(
        Math.round(Math.random() * (currentSubject.bad.length - 1)),
        currentSubject.bad
      ) : "done";
    } else {
      return (currentSubject == null ? void 0 : currentSubject.bad.length) ? getAndRemoveSubject(
        Math.round(Math.random() * (currentSubject.bad.length - 1)),
        currentSubject.bad
      ) : (currentSubject == null ? void 0 : currentSubject.good.length) ? getAndRemoveSubject(
        Math.round(Math.random() * (currentSubject.good.length - 1)),
        currentSubject.good
      ) : "done";
    }
  };
  var Grades = {
    D: [0, 1, 2, 3, 4, 5],
    C: [6, 7, 8, 9, 10],
    B: [11, 12, 13, 14],
    A: [15, 16, 17],
    S: [18, 19, 20]
  };
  var getChallengeGrade = () => {
    if (!currentSubject) {
      return;
    }
    const grade = Math.round(score / currentSubjectTotal * 20);
    return Grades.D.includes(grade) ? "D" : Grades.C.includes(grade) ? "C" : Grades.B.includes(grade) ? "B" : Grades.A.includes(grade) ? "A" : "S";
  };
  var updateLifePointsDisplay = () => {
    for (let i = 1; i <= lifePoints.max; i++) {
      const lifePointOpacity = i <= lifePoints.value ? "1" : "0.3";
      document.getElementById(`lifePointContainer_${i}`).style.opacity = lifePointOpacity;
    }
  };
  var setHeroClass = () => {
    heroContainer.classList.add(
      hardMode ? "hero_container_hard" : "hero_container_easy"
    );
  };
  var buildEnemyElement = () => {
    const newOpponentContainer = document.createElement("div");
    newOpponentContainer.classList.add(
      hardMode ? "hard_enemy_container" : "enemy_container"
    );
    const newEnnemyImg = document.createElement("img");
    newEnnemyImg.src = hardMode ? "assets/challenge/characters/enemies/hard/attack/1.png" : "assets/challenge/characters/enemies/black_spirit/run/1.png";
    newOpponentContainer.append(newEnnemyImg);
    document.getElementsByTagName("body")[0].append(newOpponentContainer);
    return newOpponentContainer;
  };
  var buildEnemy = (answer) => {
    const enemyElement = buildEnemyElement();
    if (!enemyElement) {
      return;
    }
    document.getElementsByTagName("body")[0].append();
    if (hardMode) {
      enemyViewPoint.style.left = "120vw";
      enemyViewPoint.style.display = "flex";
    }
    const enemy = new Enemy(enemyElement, answer);
    ennemiesOnScreen.push(enemy);
    return enemy;
  };
  var buildAndLaunchEnemy = (answer) => {
    const enemy = buildEnemy(answer);
    if (!enemy) {
      return;
    }
    lightUpAnswerDataContainer();
    answerDataValue.innerHTML = enemy.answer.data;
    launchOpponent(enemy);
  };
  var triggerOpponentsApparition = () => {
    const newAnswer = getNextAnswer();
    enemiesComingTimeout = setTimeout(
      () => {
        if (newAnswer && newAnswer !== "done") {
          buildAndLaunchEnemy(newAnswer);
        } else {
          launchEndOfChallenge();
        }
      },
      Math.random() > 0.5 ? 500 : 1e3
    );
  };
  var backgroundSrc = null;
  var launchEndOfChallenge = () => {
    gameFinished = true;
    document.getElementById("endOfGameInterface").style.display = "flex";
    clearGameTimeouts();
    initAllAnimations();
    heroImage.src = "assets/challenge/characters/hero/run/1.png";
    document.getElementById("transformation_background").style.display = "none";
    const grade = getChallengeGrade();
    const levelUpAudio = document.getElementById(
      "levelup_audio"
    );
    const endOfChallengeButton = document.getElementById(
      "challengesuccessButton"
    );
    const displayEndOfGameButton = () => {
      if (grade === "A" || grade === "S") {
        endOfChallengeButton.style.display = "flex";
        levelUpAudio.play();
      }
    };
    setTimeout(() => {
      if (!grade) {
        return;
      }
      killAllAudios();
      document.getElementById("endOfGameInterfaceScore").innerHTML = grade;
      document.getElementById("endOfGameInterfaceScore").style.display = "flex";
      const stampAudio = document.getElementById(
        "stamp_audio"
      );
      stampAudio.play();
      setTimeout(() => {
        displayEndOfGameButton();
      }, 2e3);
    }, 1e3);
  };
  var ANIMATION_RUNNING_VALUES = {
    [0 /* attack */]: 0,
    [1 /* run */]: 0,
    [2 /* walk */]: 0,
    [4 /* death */]: 0,
    [3 /* hurt */]: 0,
    [5 /* idle */]: 0,
    [7 /* stop_time */]: 0,
    [6 /* stop */]: 0,
    [8 /* cancel_stop_time */]: 0,
    [9 /* opponent_idle */]: 0,
    [10 /* opponent_run */]: 0,
    [11 /* opponent_attack */]: 0,
    [13 /* opponent_death */]: 0,
    [12 /* opponent_move */]: 0,
    [14 /* camera_left_to_right */]: 0,
    [15 /* camera_right_to_left */]: 0,
    [16 /* character_left_to_right_move */]: 0,
    [17 /* hero_sword_slash */]: 0,
    [18 /* transformation_pre_run */]: 0,
    [19 /* transformation_run */]: 0,
    [20 /* transformation_hurt */]: 0,
    [21 /* boss_idle */]: 0,
    [22 /* boss_attack */]: 0
  };
  var THROTTLE_NUMS = {
    [0 /* attack */]: 0,
    [1 /* run */]: 5,
    [2 /* walk */]: 5,
    [4 /* death */]: 5,
    [3 /* hurt */]: 0,
    [5 /* idle */]: 20,
    [7 /* stop_time */]: 5,
    [6 /* stop */]: 0,
    [8 /* cancel_stop_time */]: 5,
    [9 /* opponent_idle */]: 5,
    [10 /* opponent_run */]: 5,
    [11 /* opponent_attack */]: 0,
    [13 /* opponent_death */]: 0,
    [12 /* opponent_move */]: 1,
    [14 /* camera_left_to_right */]: 0,
    [15 /* camera_right_to_left */]: 5,
    [17 /* hero_sword_slash */]: 0,
    [16 /* character_left_to_right_move */]: 5,
    [18 /* transformation_pre_run */]: 5,
    [19 /* transformation_run */]: 5,
    [20 /* transformation_hurt */]: 0,
    [21 /* boss_idle */]: 15,
    [22 /* boss_attack */]: 10
  };
  var AnimationRequest = class {
    constructor(animation, callBack) {
      this.animation = animation;
      this.callBack = callBack;
    }
  };
  var APP_ELEMENTS_ANIMATION_QUEUE = {
    hero: {
      request_queue: [],
      current_animation: null,
      associated_animations: [
        1 /* run */,
        0 /* attack */,
        3 /* hurt */,
        4 /* death */,
        6 /* stop */,
        7 /* stop_time */,
        20 /* transformation_hurt */,
        18 /* transformation_pre_run */,
        19 /* transformation_run */
      ]
    },
    enemy: {
      request_queue: [],
      current_animation: null,
      associated_animations: [
        11 /* opponent_attack */,
        10 /* opponent_run */,
        13 /* opponent_death */,
        12 /* opponent_move */
      ]
    }
  };
  var getAppIdByAnimationId = (animationId) => {
    for (const appId in APP_ELEMENTS_ANIMATION_QUEUE) {
      if (APP_ELEMENTS_ANIMATION_QUEUE.hasOwnProperty(appId)) {
        const element = APP_ELEMENTS_ANIMATION_QUEUE[appId];
        if (element.associated_animations.includes(animationId)) {
          return appId;
        }
      }
    }
    return false;
  };
  var fullScreen = false;
  var timeManipulationToggle = () => {
    if (!fullScreen) {
      document.getElementsByTagName("body")[0].requestFullscreen();
      fullScreen = true;
    }
    if (!gameLaunched || window.innerWidth > 1e3 || !hardMode) return;
    if (runStopped) {
      resumeRun();
    } else {
      stopRun();
    }
  };
  var createMapBlock = (left) => {
    const block = document.createElement("div");
    block.classList.add("mapBlock");
    const backgroundImage = document.createElement("img");
    backgroundImage.src = backgroundSrc ? backgroundSrc : "";
    block.append(backgroundImage);
    block.style.position = "fixed";
    block.style.left = `${left}px`;
    block.onclick = (event) => timeManipulationToggle();
    document.getElementsByTagName("body")[0].append(block);
    return block;
  };
  var slowTime = (multiplicator) => {
    const runMultiplicatorBase = THROTTLE_NUMS[1 /* run */] ? THROTTLE_NUMS[1 /* run */] : 1;
    THROTTLE_NUMS[1 /* run */] = runMultiplicatorBase * multiplicator * 1.5 * 1.5;
    const cameraMoveMultiplicatorBase = THROTTLE_NUMS[14 /* camera_left_to_right */] ? THROTTLE_NUMS[14 /* camera_left_to_right */] : 1;
    THROTTLE_NUMS[14 /* camera_left_to_right */] = cameraMoveMultiplicatorBase * multiplicator * 1.5;
    const opponentRunMultiplicatorBase = THROTTLE_NUMS[10 /* opponent_run */] ? THROTTLE_NUMS[10 /* opponent_run */] : 1;
    THROTTLE_NUMS[10 /* opponent_run */] = opponentRunMultiplicatorBase * multiplicator;
    const opponentMoveMultiplicatorBase = THROTTLE_NUMS[12 /* opponent_move */] ? THROTTLE_NUMS[12 /* opponent_move */] : 1;
    THROTTLE_NUMS[12 /* opponent_move */] = opponentMoveMultiplicatorBase * multiplicator * 2;
  };
  var moveCamera = (direction, throttleNum = 0, previousFrameTimestamp) => {
    if (ANIMATION_RUNNING_VALUES[direction] === 0 || ANIMATION_RUNNING_VALUES[direction] > 1) {
      return;
    }
    const currentFrameTimeStamp = Date.now();
    const diff = currentFrameTimeStamp - previousFrameTimestamp;
    if (throttleNum < THROTTLE_NUMS[14 /* camera_left_to_right */]) {
      throttleNum++;
      return requestAnimationFrame(
        () => moveCamera(direction, throttleNum, currentFrameTimeStamp)
      );
    }
    throttleNum = 0;
    MAPS.forEach(
      (map) => map.style.left = `${map.offsetLeft + (direction === 14 /* camera_left_to_right */ ? -1 : 1) * diff / 3}px`
    );
    requestAnimationFrame(() => moveCamera(direction, 0, currentFrameTimeStamp));
  };
  var ALGEBRA_INTRO_2 = {
    title: "Algebra Basics",
    good: [
      new Answer("A variable is a symbol for an unknown value", true),
      new Answer("The graph of a quadratic function is a parabola", true),
      new Answer("A constant is a number that doesn\u2019t change", true),
      new Answer("A coefficient is a number multiplying a variable", true),
      new Answer("An equation shows two expressions are equal", true),
      new Answer("A term is a part of an expression separated by + or -", true),
      new Answer("Like terms have the same variable and power", true),
      new Answer("A polynomial is made of terms combined by + or -", true),
      new Answer("A monomial has one term", true),
      new Answer("A binomial has two terms", true),
      new Answer("A trinomial has three terms", true),
      new Answer("The degree of a polynomial is the highest exponent", true),
      new Answer("Factoring is rewriting an expression as products", true),
      new Answer("Linear equations have the form ax + b = c", true),
      new Answer("A function relates each input to one output", true),
      new Answer("Quadratic equations have the form ax^2 + bx + c = 0", true),
      new Answer("Distributive property: a(b + c) = ab + ac", true),
      new Answer("The zero-product property: if ab = 0, then a = 0 or b = 0", true),
      new Answer("An inequality compares two expressions", true),
      new Answer("An exponent tells how many times to multiply a number by itself", true),
      new Answer("A solution is a value that makes an equation true", true),
      new Answer("A system of equations has more than one equation", true),
      new Answer("The slope of a line is rise over run", true),
      new Answer("Parallel lines have the same slope", true)
    ],
    bad: [
      new Answer("A variable is a constant number", false),
      new Answer("The graph of a linear expression is V shaped", false),
      new Answer("A constant can change", false),
      new Answer("A coefficient divides a variable", false),
      new Answer("An equation only has one side", false),
      new Answer("A term has to include two variables", false),
      new Answer("Like terms have different variables", false),
      new Answer("A polynomial has only one term", false),
      new Answer("A monomial has two terms", false),
      new Answer("A binomial has three terms", false),
      new Answer("A trinomial has four terms", false),
      new Answer("The degree of a polynomial is the number of terms", false),
      new Answer("Factoring adds terms together", false),
      new Answer("Linear equations always have a squared variable", false),
      new Answer("A function can have multiple outputs for one input", false),
      new Answer("Quadratic equations have no exponents", false),
      new Answer("Distributive property is about dividing terms", false),
      new Answer("Zero-product property applies to addition", false),
      new Answer("An inequality always has an equal sign", false),
      new Answer("An exponent decreases a number", false),
      new Answer("A solution is any random number", false),
      new Answer("A system of equations only has one equation", false),
      new Answer("The slope of a line is horizontal distance", false),
      new Answer("Parallel lines intersect at one point", false)
    ]
  };
  var launchAnimationAndDeclareItLaunched = (characterElement, throttleNum, extension, spriteBase, spriteIndex, max, min, loop, animationId, endOfAnimationCallback) => {
    if (ANIMATION_RUNNING_VALUES[animationId] >= 1) {
      return;
    }
    ANIMATION_RUNNING_VALUES[animationId]++;
    const animationCallback = () => {
      launchCharacterAnimation(
        characterElement,
        throttleNum,
        extension,
        spriteBase,
        spriteIndex,
        max,
        min,
        loop,
        animationId
      );
    };
    const elementAssociatedWithThisAnimation = getAppIdByAnimationId(animationId);
    if (elementAssociatedWithThisAnimation) {
      const animationRequestCallback = () => {
        if (APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation) {
          requestAnimationFrame(animationRequestCallback);
          return;
        }
        APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation = animationId;
        animationCallback();
      };
      if (APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation) {
        APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].request_queue.unshift(
          new AnimationRequest(animationId, animationRequestCallback)
        );
        return;
      }
      APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation = animationId;
    }
    animationCallback();
  };
  var launchCharacterAnimation = (characterElement, throttleNum, extension, spriteBase, spriteIndex, max, min, loop, animationId, endOfAnimationCallback, lastExecutionTimeStamp) => {
    if (gameFinished) {
      return;
    }
    if (!ANIMATION_RUNNING_VALUES[animationId] || ANIMATION_RUNNING_VALUES[animationId] > 1) {
      return;
    }
    const elementAssociatedWithThisAnimation = getAppIdByAnimationId(animationId);
    if (elementAssociatedWithThisAnimation) {
      if (APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation !== animationId) {
        console.log("there was an error, an animation should not run");
        console.log("current an >" + animationId);
        console.log("registered =>");
        console.log(
          APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation
        );
        return;
      }
      const requestQueue = APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].request_queue;
      if (requestQueue.length) {
        APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation = null;
        initAnimation(animationId);
        const firstQueueElement = requestQueue.pop();
        firstQueueElement == null ? void 0 : firstQueueElement.callBack();
      }
    }
    if (throttleNum < THROTTLE_NUMS[animationId]) {
      throttleNum++;
      return requestAnimationFrame(
        () => launchCharacterAnimation(
          characterElement,
          throttleNum,
          extension,
          spriteBase,
          spriteIndex,
          max,
          min,
          loop,
          animationId,
          () => {
          },
          lastExecutionTimeStamp
        )
      );
    }
    const newExecutionTimeStamp = Date.now();
    if ((animationId === 1 /* run */ || animationId === 11 /* opponent_attack */) && lastExecutionTimeStamp) {
      const diff = newExecutionTimeStamp - lastExecutionTimeStamp;
      if (diff < ANIMTION_HERO_RUN_DURATION_BETWEEN_FRAMES_IN_MS) {
        return requestAnimationFrame(
          () => launchCharacterAnimation(
            characterElement,
            throttleNum,
            extension,
            spriteBase,
            spriteIndex,
            max,
            min,
            loop,
            animationId,
            () => {
            },
            lastExecutionTimeStamp
          )
        );
      }
    }
    throttleNum = 0;
    if (spriteIndex === max) {
      if (loop === false) {
        ANIMATION_RUNNING_VALUES[animationId] = 0;
        const elementAssociatedWithThisAnimation2 = getAppIdByAnimationId(animationId);
        if (elementAssociatedWithThisAnimation2) {
          if (APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation2].current_animation !== animationId) {
            return;
          }
          APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation2].current_animation = null;
        }
        if (endOfAnimationCallback) {
          endOfAnimationCallback();
        }
        return;
      }
      spriteIndex = min;
    } else {
      spriteIndex++;
    }
    if (!characterElement) {
      return;
    }
    characterElement.src = `${spriteBase}/${spriteIndex}.${extension}`;
    requestAnimationFrame(
      () => launchCharacterAnimation(
        characterElement,
        throttleNum,
        extension,
        spriteBase,
        spriteIndex,
        max,
        min,
        loop,
        animationId,
        () => {
        },
        newExecutionTimeStamp
      )
    );
  };
  var initAnimation = (animationId) => {
    ANIMATION_RUNNING_VALUES[animationId] = 0;
  };
  var initAllAnimations = () => {
    ANIMATION_RUNNING_VALUES[0 /* attack */] = 0;
    ANIMATION_RUNNING_VALUES[1 /* run */] = 0;
    ANIMATION_RUNNING_VALUES[4 /* death */] = 0;
    ANIMATION_RUNNING_VALUES[3 /* hurt */] = 0;
    ANIMATION_RUNNING_VALUES[5 /* idle */] = 0;
    ANIMATION_RUNNING_VALUES[10 /* opponent_run */] = 0;
    ANIMATION_RUNNING_VALUES[13 /* opponent_death */] = 0;
    ANIMATION_RUNNING_VALUES[12 /* opponent_move */] = 0;
    ANIMATION_RUNNING_VALUES[14 /* camera_left_to_right */] = 0;
    ANIMATION_RUNNING_VALUES[15 /* camera_right_to_left */] = 0;
    ANIMATION_RUNNING_VALUES[16 /* character_left_to_right_move */] = 0;
    ANIMATION_RUNNING_VALUES[18 /* transformation_pre_run */] = 0;
    ANIMATION_RUNNING_VALUES[19 /* transformation_run */] = 0;
    ANIMATION_RUNNING_VALUES[20 /* transformation_hurt */] = 0;
    ANIMATION_RUNNING_VALUES[21 /* boss_idle */] = 0;
    ANIMATION_RUNNING_VALUES[22 /* boss_attack */] = 0;
  };
  var turnHeroTransformationOff = () => {
    transformed = false;
    runAudio.playbackRate = 1;
    transformationOffAudio.play();
    progressBar.style.display = "flex";
    transformedEpicAudio.pause();
    transformedEpicAudio.currentTime = 0;
    electricityAudio.currentTime = 0;
    epicAudio.currentTime = 0;
    setTimeout(() => {
      electricityAudio.volume = 0;
    }, 1e3);
    setTimeout(() => {
      epicAudio.play();
    }, 4e3);
    launchHeroRunAnimation();
  };
  var launchAttack = () => {
    if (invisible || !heroIsAlive || runStopped) {
      return;
    }
    if (transformed) {
      laserdAudio.play();
      laserdAudio.currentTime = 0;
    } else {
      swordAudio.play();
      swordAudio.currentTime = 0;
    }
    launchSwordSlash();
    launchAnimationAndDeclareItLaunched(
      heroImage,
      0,
      "png",
      `assets/challenge/characters/${transformed ? "transformed_hero" : "hero"}/attack`,
      1,
      transformed ? 12 : 4,
      1,
      false,
      0 /* attack */
    );
    const enemyCanBeHit = (enemy) => {
      const enemyLeft = hardMode ? getHardModeEnemyRealLeft(enemy) * 1.2 : enemy.element.getBoundingClientRect().left;
      return enemyLeft > heroContainer.getBoundingClientRect().left + heroContainer.getBoundingClientRect().width && enemyLeft < heroContainer.getBoundingClientRect().left + heroContainer.getBoundingClientRect().width + swordReach;
    };
    ennemiesOnScreen.forEach((enemy) => {
      if (!enemyCanBeHit(enemy)) {
        return;
      }
      if (!enemy.answer.good) {
        killWrongEnemy(enemy);
      } else {
        killRightEnemyAndUpdateScore(enemy);
      }
    });
    if (preTransformed || !heroIsAlive) {
      return;
    }
    clearTimeoutAndLaunchNewOne(
      0 /* HERO */,
      setTimeout(() => {
        launchHeroRunAnimation();
      }, 200)
    );
  };
  window.launchAttack = (event) => {
    if (!gameLaunched) {
      launchGame();
      return;
    }
    launchAttack();
  };
  var clearTimeoutAndLaunchNewOne = (timeoutId, timeout) => {
    GAME_TIMEOUTS[timeoutId].forEach((gameTimout) => clearTimeout(gameTimout));
    GAME_TIMEOUTS[timeoutId] = [timeout];
  };
  var launchOpponent = (enemy) => {
    APP_ELEMENTS_ANIMATION_QUEUE.enemy.current_animation = null;
    interruptAnimation(10 /* opponent_run */);
    launchAnimationAndDeclareItLaunched(
      enemy.element.firstChild,
      0,
      "png",
      hardMode ? "assets/challenge/characters/enemies/hard/idle" : "assets/challenge/characters/enemies/black_spirit/run",
      1,
      hardMode ? 16 : 4,
      1,
      true,
      10 /* opponent_run */
    );
    ANIMATION_RUNNING_VALUES[12 /* opponent_move */]++;
    moveEnemy(enemy, 0, Date.now());
  };
  var moveEnemy = (enemy, throttleNum = 0, previousTimeStamp) => {
    if (ANIMATION_RUNNING_VALUES[12 /* opponent_move */] !== 1) {
      return;
    }
    const currentTimeStamp = Date.now();
    const diff = currentTimeStamp - previousTimeStamp;
    if (throttleNum < THROTTLE_NUMS[12 /* opponent_move */]) {
      throttleNum++;
      return requestAnimationFrame(() => {
        moveEnemy(enemy, throttleNum, currentTimeStamp);
      });
    }
    let hardEnemyMoveRatio = 1;
    throttleNum = 0;
    enemy.element.style.left = `${Math.round(
      enemy.element.getBoundingClientRect().left - diff * (hardMode ? 0.7 * hardEnemyMoveRatio : 1.5)
    )}px`;
    if (hardMode) {
      enemyViewPoint.style.left = `${Math.round(
        enemyViewPoint.getBoundingClientRect().left - diff * (hardMode ? 0.7 : 1)
      )}px`;
    }
    requestAnimationFrame(() => moveEnemy(enemy, throttleNum, currentTimeStamp));
  };
  var transformIfRequired = () => {
    if (rewardStreak >= TRANSFORMATION_THRESHOLD && !transformed) {
      rewardStreak = 0;
      updateTransformationProgressBarDisplay();
      launchTransformation();
    }
  };
  var killRightEnemyAndUpdateScore = (enemy) => {
    killEnemy(enemy);
    rewardHero();
    transformIfRequired();
  };
  var rewardHero = () => {
    const bonus_ratio = transformed ? TRANSFORMED_BONUS_RATIO : 1;
    if (!transformed) {
      rewardStreak++;
      updateTransformationProgressBarDisplay();
    }
    score += bonus_ratio * REWARD_UNIT;
    updateScoreDisplay();
    displayReward("Congrats! You destroyed a good answer!");
    if (transformed) {
      displayTransformationKillReward(
        `Transformation bonus reward! X${TRANSFORMED_BONUS_RATIO}`
      );
    }
  };
  var updateScoreDisplay = () => {
    scoreContainer.innerHTML = (score * KILLED_ENEMY_REWARD).toString();
  };
  var killWrongEnemy = (enemy) => {
    scoreMalusContainer.style.display = "flex";
    lifePoints.value--;
    checkForHerosDeath();
    updateLifePointsDisplay();
    rewardStreak = 0;
    updateTransformationProgressBarDisplay();
    killEnemy(enemy);
    displayMalus("MALUS! Wrong enemy killed!");
  };
  var displayMalus = (content) => {
    if (currentMalusContainerTimeout) {
      clearTimeout(currentMalusContainerTimeout);
      currentMalusContainerTimeout = null;
    }
    scoreMalusContainer.style.display = "flex";
    currentMalusContainerTimeout = setTimeout(() => {
      scoreMalusDetail.innerHTML = "";
      scoreMalusContainer.style.display = "none";
    }, 2e3);
  };
  var hideMalus = () => {
    hideReward();
    if (currentMalusContainerTimeout) {
      clearTimeout(currentMalusContainerTimeout);
      currentMalusContainerTimeout = null;
    }
    scoreMalusDetail.innerHTML = "";
    scoreMalusContainer.style.display = "none";
  };
  var displayReward = (content) => {
    hideMalus();
    if (currentRewardContainerTimeout) {
      clearTimeout(currentRewardContainerTimeout);
      currentRewardContainerTimeout = null;
    }
    scoreRewardContainer.style.display = "flex";
    currentRewardContainerTimeout = setTimeout(() => {
      scoreRewardDetail.innerHTML = "";
      scoreRewardContainer.style.display = "none";
    }, 2e3);
  };
  var displayTransformationKillReward = (content) => {
    const transformationRewardContainer = document.getElementById(
      "transformed_hero_bonus_reward_container"
    );
    transformationRewardContainer.style.display = "flex";
    if (currentTransformationRewardContainerTimeout) {
      clearTimeout(currentTransformationRewardContainerTimeout);
      currentTransformationRewardContainerTimeout = null;
    }
    currentRewardContainerTimeout = setTimeout(() => {
      transformationRewardContainer.style.display = "none";
    }, REWARD_TIMEOUT_DURATION);
  };
  var hideReward = () => {
  };
  var killEnemy = (enemy) => {
    const launchExplosion = () => {
      bombAudio.play();
      bombAudio.currentTime = 0;
      launchAnimationAndDeclareItLaunched(
        enemy.element.firstChild,
        0,
        "png",
        "assets/challenge/explosion",
        1,
        10,
        1,
        false,
        13 /* opponent_death */
      );
    };
    launchExplosion();
    destroyEnemyAndLaunchNewOne(enemy);
  };
  var getHardModeEnemyRealLeft = (enemy) => {
    const enemyImg = enemy.element;
    return enemyImg.getBoundingClientRect().left + enemyImg.getBoundingClientRect().width * 0.3;
  };
  var clearEnemy = (enemy) => {
    interruptAnimation(10 /* opponent_run */);
    interruptAnimation(11 /* opponent_attack */);
    destroyEnemy(enemy);
  };
  var destroyEnemy = (enemy) => {
    clearAndHideAnswerDataContainer();
    heroInTheRedZone = false;
    updateEnemyViewPointDisplay();
    setTimeout(() => {
      enemy.element.remove();
      if (!preTransformed) {
        triggerOpponentsApparition();
      }
    }, 300);
    ennemiesOnScreen.forEach((enemyOnScreen, index) => {
      if (enemy === enemyOnScreen) {
        ennemiesOnScreen.splice(index, 1);
        interruptAnimation(12 /* opponent_move */);
      }
    });
  };
  var destroyEnemyAndLaunchNewOne = (enemy) => {
    destroyEnemy(enemy);
  };
  var hurtHero = () => {
    if (!heroIsAlive) {
      return;
    }
    runAudio.volume = 0;
    rewardStreak = 0;
    updateTransformationProgressBarDisplay();
    heroHurt = true;
    lifePoints.value--;
    checkForHerosDeath();
    updateLifePointsDisplay();
    launchHeroHurtAnimation();
    displayMalus("Malus! You were hurt!");
  };
  var checkForHerosDeath = () => {
    if (lifePoints.value === 0) {
      killHero();
    }
  };
  var killHero = () => {
    runAudio.volume = 0;
    heroIsAlive = false;
    launchDeathAnimation();
  };
  var viewPointOnScreen = false;
  var enemyViewPointThresholdCrossed = false;
  var detectCollision = () => {
    ennemiesOnScreen.forEach((enemyOnScreen) => {
      const enemyLeft = hardMode ? getHardModeEnemyRealLeft(enemyOnScreen) : enemyOnScreen.element.getBoundingClientRect().left;
      if (hardMode && !viewPointOnScreen && enemyLeft < window.innerWidth) {
        viewPointOnScreen = true;
        enemyViewPoint.style.display = "flex";
      }
      if (hardMode && !heroInTheRedZone && enemyViewPoint.getBoundingClientRect().left + enemyViewPoint.getBoundingClientRect().width < heroContainer.getBoundingClientRect().left + heroContainer.getBoundingClientRect().width) {
        heroInTheRedZone = true;
        updateEnemyViewPointDisplay();
        launchAnimationAndDeclareItLaunched(
          enemyOnScreen.element.firstChild,
          0,
          "png",
          "assets/challenge/characters/enemies/hard/attack",
          1,
          30,
          1,
          true,
          11 /* opponent_attack */
        );
      }
      if (hardMode && !enemyViewPointThresholdCrossed && enemyLeft < window.innerWidth) {
        enemyViewPointThresholdCrossed = true;
      }
      if (heroContainer.getBoundingClientRect().left + heroContainer.getBoundingClientRect().width > enemyLeft && enemyOnScreen.collideable) {
        enemyOnScreen.collideable = false;
        if (!invisible || enemyOnScreen.answer.good) {
          hurtHero();
        } else if (invisible && !enemyOnScreen.answer.good) {
          rewardHero();
          transformIfRequired();
        }
      }
    });
    requestAnimationFrame(detectCollision);
  };
  var checkForScreenUpdateFromLeftToRight = (throttleNum) => {
    if (throttleNum < 10) {
      throttleNum++;
      return requestAnimationFrame(
        () => checkForScreenUpdateFromLeftToRight(throttleNum)
      );
    }
    throttleNum = 0;
    const firstMapDomElement = MAPS[0];
    if (firstMapDomElement.offsetLeft < -window.innerWidth) {
      firstMapDomElement.remove();
      MAPS.shift();
    }
    const lastMapDomElement = MAPS[MAPS.length - 1];
    if (lastMapDomElement && lastMapDomElement.offsetLeft <= window.innerWidth / 10) {
      MAPS.push(
        createMapBlock(
          lastMapDomElement.offsetLeft + lastMapDomElement.offsetWidth
        )
      );
    }
    requestAnimationFrame(() => checkForScreenUpdateFromLeftToRight(throttleNum));
  };
  var launchHeroRunAnimation = () => {
    if (!heroIsAlive) {
      return;
    }
    runAudio.volume = 0.7;
    launchAnimationAndDeclareItLaunched(
      heroImage,
      0,
      "png",
      `assets/challenge/characters/${transformed ? "transformed_hero" : "hero"}/run`,
      1,
      transformed ? 6 : 8,
      1,
      true,
      transformed ? 19 /* transformation_run */ : 1 /* run */
    );
  };
  var launchRun = () => {
    if (runStopped) {
      return;
    }
    if (ANIMATION_RUNNING_VALUES[14 /* camera_left_to_right */] === 0) {
      startCamera();
      moveCamera(14 /* camera_left_to_right */, 0, Date.now());
    }
    launchHeroRunAnimation();
  };
  var heroInitialTop = heroContainer.getBoundingClientRect().top;
  document.addEventListener("keydown", (event) => {
    if (event.key === "d") {
      if (!gameLaunched) {
        launchGame();
      } else if (ANIMATION_RUNNING_VALUES[1 /* run */] === 0) {
        resumeRun();
      }
    }
    if (!gameLaunched || preTransformed || heroHurt) {
      return;
    }
    if (event.key === " " && !invisible) {
      launchInvisibilityToggle();
    }
    if (event.key === "w") {
      launchAttack();
    }
    if (event.key === "v") {
      slowTime(10);
    }
    if (event.key === "y") {
      launchDeathAnimation();
    }
    if (event.key === "s" && hardMode) {
      if (runStopped) return;
      stopRun();
    }
  });
  var clearGameTimeouts = () => {
    GAME_TIMEOUTS[0 /* HERO */].forEach((timeout) => {
      clearTimeout(timeout);
    });
    GAME_TIMEOUTS[0 /* HERO */] = [];
    GAME_TIMEOUTS[1 /* ENEMY */].forEach((timeout) => clearTimeout(timeout));
    GAME_TIMEOUTS[1 /* ENEMY */] = [];
  };
  var stopRun = () => {
    if (heroInTheRedZone) {
      return;
    }
    runAudio.volume = 0;
    runStopped = true;
    if (enemiesComingTimeout) {
      clearTimeout(enemiesComingTimeout);
      enemiesComingTimeout = null;
    }
    ANIMATION_RUNNING_VALUES[12 /* opponent_move */] = 0;
    interruptAnimation(14 /* camera_left_to_right */);
    const stopCallback = () => {
      heroImage.src = "assets/challenge/characters/hero/walk/1.png";
    };
    addAnimationCallbackToQueue(6 /* stop */, stopCallback);
  };
  var addAnimationCallbackToQueue = (animation, callBack) => {
    const appElementId = getAppIdByAnimationId(animation);
    if (!appElementId) {
      return;
    }
    APP_ELEMENTS_ANIMATION_QUEUE[appElementId].request_queue.unshift(
      new AnimationRequest(animation, callBack)
    );
  };
  var interruptAnimation = (animation) => {
    ANIMATION_RUNNING_VALUES[animation] = 0;
    const appElementId = getAppIdByAnimationId(animation);
    if (!appElementId) {
      return;
    }
    if (!APP_ELEMENTS_ANIMATION_QUEUE[appElementId].current_animation === null) {
      APP_ELEMENTS_ANIMATION_QUEUE[appElementId].current_animation = null;
    }
  };
  var resumeRun = () => {
    runStopped = false;
    launchRun();
    ennemiesOnScreen.forEach((enemy) => {
      ANIMATION_RUNNING_VALUES[12 /* opponent_move */]++;
      moveEnemy(enemy, 0, Date.now());
    });
    if (!ennemiesOnScreen.length) {
      triggerOpponentsApparition();
    }
  };
  var checkForOpponentsClearance = () => {
    ennemiesOnScreen.forEach((enemyOnScreen) => {
      const enemyLeft = hardMode ? getHardModeEnemyRealLeft(enemyOnScreen) : enemyOnScreen.element.getBoundingClientRect().left;
      if (enemyLeft < 0 - window.innerWidth * 0.25) {
        clearEnemy(enemyOnScreen);
      }
    });
    requestAnimationFrame(checkForOpponentsClearance);
  };
  var launchInvisibilityToggle = () => {
    invisible = !invisible;
    heroContainer.style.opacity = invisible ? "0.3" : "1";
    if (invisible) {
      const teleportAudio = document.getElementById(
        "teleport_audio"
      );
      teleportAudio.volume = 0.15;
      teleportAudio.play().then((val) => teleportAudio.currentTime = 0);
    }
    if (!invisible) {
      return;
    }
    setTimeout(launchInvisibilityToggle, INVISIBILITY_DURATION_IN_MILLISECONDS);
  };
  window.launchInvisibilityToggle = launchInvisibilityToggle;
  var launchTransformation = () => {
    if (runStopped || hardMode) {
      return;
    }
    runAudio.volume = 0;
    swordAudio.volume = 0;
    bombAudio.volume = 0;
    epicAudio.pause();
    if (transformedAlready) {
      electricityAudio.volume = 0.7;
      transformationScreamAudio.volume = 0.1;
      transformationScreamAudio.play();
      setTimeout(() => transformedEpicAudio.play(), 1e3);
      setTimeout(() => electricityAudio.play(), 200);
      document.getElementById("transformation_background").style.display = "none";
      clearGameTimeouts();
      transformed = true;
      launchAnimationAndDeclareItLaunched(
        heroImage,
        0,
        "png",
        "assets/challenge/characters/transformed_hero/run",
        1,
        6,
        1,
        true,
        19 /* transformation_run */
      );
      setTimeout(turnHeroTransformationOff, 2e4);
      return;
    }
    document.getElementById("transformation_background").style.display = "flex";
    preTransformed = true;
    clearEnemiesInstantly();
    bassAudio.play();
    setTimeout(() => electricityAudio.play(), 200);
    clearTimeoutAndLaunchNewOne(
      0 /* HERO */,
      setTimeout(() => {
        launchAnimationAndDeclareItLaunched(
          heroImage,
          0,
          "png",
          "assets/challenge/characters/transformed_hero/pre_run",
          1,
          9,
          1,
          true,
          18 /* transformation_pre_run */
        );
        if (enemiesComingTimeout) {
          clearTimeout(enemiesComingTimeout);
        }
        clearTimeoutAndLaunchNewOne(
          0 /* HERO */,
          setTimeout(() => {
            triggerOpponentsApparition();
            document.getElementById("transformation_background").style.display = "none";
            transformationScreamAudio.play();
            setTimeout(() => transformedEpicAudio.play(), 1e3);
            electricityAudio.volume = 0.2;
            transformed = true;
            preTransformed = false;
            runAudio.volume = 0.7;
            swordAudio.volume = 0.65;
            bombAudio.volume = 0.12;
            progressBar.style.display = "none";
            launchAnimationAndDeclareItLaunched(
              heroImage,
              0,
              "png",
              "assets/challenge/characters/transformed_hero/run",
              1,
              6,
              1,
              true,
              19 /* transformation_run */
            );
            setTimeout(turnHeroTransformationOff, 15e3);
          }, 5e3)
        );
      }, 500)
    );
  };
  var clearEnemiesInstantly = () => {
    ennemiesOnScreen.forEach((enemy, index) => {
      enemy.element.remove();
      ennemiesOnScreen.splice(index, 1);
      interruptAnimation(12 /* opponent_move */);
    });
  };
  var lightUpAnswerDataContainer = () => {
    answerDataContainer.style.opacity = "1";
  };
  var clearAndHideAnswerDataContainer = () => {
    answerDataContainer.style.opacity = "1";
    answerDataValue.innerHTML = "";
  };
  var launchSwordSlash = () => {
    ANIMATION_RUNNING_VALUES[17 /* hero_sword_slash */]++;
    if (ANIMATION_RUNNING_VALUES[17 /* hero_sword_slash */] !== 1 || transformed) {
      return;
    }
    ANIMATION_RUNNING_VALUES[17 /* hero_sword_slash */]++;
    console.log("slash!");
    swordSlashImg.style.display = "flex";
    setTimeout(() => {
      swordSlashImg.style.display = "none";
      ANIMATION_RUNNING_VALUES[17 /* hero_sword_slash */] = 0;
    }, 75);
  };
  var launchDeathAnimation = () => {
    initHeroAnimations();
    ANIMATION_RUNNING_VALUES[14 /* camera_left_to_right */] = 0;
    APP_ELEMENTS_ANIMATION_QUEUE.hero.current_animation = null;
    APP_ELEMENTS_ANIMATION_QUEUE.hero.request_queue = [];
    const killHero2 = () => {
      launchAnimationAndDeclareItLaunched(
        heroImage,
        0,
        "png",
        "assets/challenge/characters/hero/death",
        1,
        6,
        1,
        false,
        4 /* death */
      );
      clearGameTimeouts();
      setTimeout(
        () => window.location.href = hardMode ? "http://localhost:3001/dead_hard" : "http://localhost:3001/dead",
        1e3
      );
    };
    if (transformed) {
      transformed = false;
    }
    heroImage.src = "assets/challenge/characters/hero/death/1.png";
    setTimeout(killHero2, 1e3);
  };
  var launchHeroHurtAnimation = () => {
    launchAnimationAndDeclareItLaunched(
      heroImage,
      0,
      "png",
      transformed ? "assets/challenge/characters/transformed_hero/hurt" : "assets/challenge/characters/hero/hurt",
      1,
      transformed ? 5 : 3,
      1,
      false,
      transformed ? 20 /* transformation_hurt */ : 3 /* hurt */
    );
    if (!hardMode) {
      stopCamera();
    }
    clearTimeoutAndLaunchNewOne(
      0 /* HERO */,
      setTimeout(() => {
        heroHurt = false;
        if (heroIsAlive && ANIMATION_RUNNING_VALUES[1 /* run */] === 0) {
          launchRun();
        }
      }, 500)
    );
  };
  var stopCamera = () => {
    ANIMATION_RUNNING_VALUES[14 /* camera_left_to_right */] = 0;
  };
  var startCamera = () => {
    if (ANIMATION_RUNNING_VALUES[14 /* camera_left_to_right */] > 0) {
      return;
    }
    ANIMATION_RUNNING_VALUES[14 /* camera_left_to_right */]++;
  };
  var initHeroAnimations = () => {
    ANIMATION_RUNNING_VALUES[1 /* run */] = 0;
    ANIMATION_RUNNING_VALUES[18 /* transformation_pre_run */] = 0;
    ANIMATION_RUNNING_VALUES[19 /* transformation_run */] = 0;
    ANIMATION_RUNNING_VALUES[3 /* hurt */] = 0;
  };
  window.onload = () => {
    setupListeners();
    launchHardModeToggle();
    setHeroClass();
    backgroundSrc = `assets/palace/maps/castle/${hardMode ? "castleback.webp" : "castle.gif"}`;
    MAPS.push(createMapBlock(0));
    MAPS.push(createMapBlock(100));
    createGameAccordingToMode();
    updateLifePointsDisplay();
    updateScoreDisplay();
    detectCollision();
    checkForScreenUpdateFromLeftToRight(10);
    checkForOpponentsClearance();
    defineCurrentSubject(hardMode ? LINEAR_ALGEBRA_BASIS : LINEAR_ALGEBRA_BASIS);
    defineSwordReach();
    updateTransformationProgressBarDisplay();
    if (hardMode) {
      epicAudio.play();
    } else {
      fireBackgroundAudio.play();
    }
  };
  var setupListeners = () => {
    var _a, _b;
    (_a = document.getElementById("playAgainLink")) == null ? void 0 : _a.addEventListener("click", (event) => window.location.reload());
    (_b = document.getElementById("backToStormGradButton")) == null ? void 0 : _b.addEventListener("click", goBackToMountain);
  };
  var createGameAccordingToMode = () => {
    if (hardMode) {
      return;
    }
    progressBar.style.display = "flex";
    epicAudio = document.getElementById(
      hardMode ? "hard_epic_audio" : "epic_audio"
    );
    epicAudio.volume = hardMode ? 1 : 1;
  };
  var launchHardModeToggle = () => {
    const modeParameter = getUrlParameter("mode");
    if (!modeParameter) {
      console.log("there is no mode parameter");
      return;
    }
    hardMode = modeParameter === "hard";
  };
  var getTransformationProgressValue = () => {
    return Math.floor(rewardStreak / TRANSFORMATION_THRESHOLD * 100);
  };
  var updateTransformationProgressBarDisplay = () => {
    const progress = document.querySelector(".progress");
    progress.style.setProperty(
      "--progress",
      `${getTransformationProgressValue()}%`
    );
  };
  var defineSwordReach = () => {
    swordReach = window.innerWidth * (window.innerWidth > 1e3 ? 0.15 : 0.35);
  };
  var launchGame = () => {
    runAudio.play();
    epicAudio.play();
    gameLaunched = true;
    launchRun();
    triggerOpponentsApparition();
  };
  var defineCurrentSubject = (subject) => {
    currentSubject = subject;
    currentSubjectTotal = currentSubject.good.length + currentSubject.bad.length;
  };
  var killAllAudios = () => {
    runAudio.pause();
    epicAudio.pause();
    transformedEpicAudio.pause();
  };

  // src/boss.ts
  var heroImage2 = document.getElementById("heroImage");
  var bossImage = document.getElementById("bossImage");
  var launcHeroIdle = () => {
    alert("iddle");
    launchAnimationAndDeclareItLaunched(
      heroImage2,
      0,
      "png",
      "assets/challenge/characters/hero/idle",
      1,
      7,
      1,
      true,
      5 /* idle */
    );
  };
  var launchBossIdle = () => {
    launchAnimationAndDeclareItLaunched(
      bossImage,
      0,
      "png",
      "assets/challenge/characters/bosses/ctuluhu/idle",
      1,
      15,
      1,
      true,
      21 /* boss_idle */
    );
  };
  var launchBossAttack = () => {
    launchAnimationAndDeclareItLaunched(
      bossImage,
      0,
      "png",
      "assets/challenge/characters/bosses/ctuluhu/attack",
      1,
      17,
      1,
      false,
      22 /* boss_attack */
    );
  };
  window.onload = () => {
    launcHeroIdle();
    launchBossIdle();
    setTimeout(() => {
      ANIMATION_RUNNING_VALUES[21 /* boss_idle */] = 0;
      launchBossAttack();
    }, 1e3);
  };
})();
//# sourceMappingURL=boss.js.map
