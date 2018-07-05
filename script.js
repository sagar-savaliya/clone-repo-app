const jlog = document.querySelector(".log");
const jrepo = document.querySelector(".select-repo");
const jfilePath = document.querySelector(".file-path");
const jkill = document.querySelector('.kill__btn');
const jclone = document.querySelector('.clone__btn');

var path;
function selectFolder(e) {
    var theFiles = e.target.files;
    path = theFiles[0].path;
    jfilePath.innerHTML = path;
}
document.querySelector('.browse-path').addEventListener('change',selectFolder);
jclone.addEventListener('click',() => clone(path));
jkill.addEventListener('click',killProcess);
appendToLog("");

function appendToLog(msg) {
    jlog.value += msg;
};

function printLog(data) {
    appendToLog(data+' \n');
}

function addCallback(ls) {
    ls.stdout.on('data', printLog);
    ls.stderr.on('data', printLog);
}

var ls;

function killProcess(e) {
    var kill  = require('tree-kill');
    kill(ls.pid);
    e.target.style.display = 'none';
}

function clone(path) {
    if (!path) {
        appendToLog("➜ path not provided\n");
        return;
    }
    const process = require('child_process');   // The power of Node.JS

    ls = process.spawn('./clone.sh', [path, jrepo.value, jrepo.selectedOptions[0].innerHTML]);
    jkill.style.display = 'inline-block';
    addCallback(ls)
    ls.on('close', function (code) {
        if (code == 0)
            appendToLog('Cloned successfully \n');
        else
            appendToLog('Clone failed with exit code ' + code + "\n");
    });
}