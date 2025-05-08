let qualType = "simulator";

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function showError(message) {
    const videoContainer = document.getElementById('video_container');
    videoContainer.innerHTML = '';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'col-xs-12 text-center alert alert-danger';
    errorDiv.style = 'margin-top: 2em';
    errorDiv.textContent = message;

    videoContainer.appendChild(errorDiv);

    document.querySelector('.well.well-sm').style.display = 'none';
}

const baselines = {
    typefly: {
        path: "typefly",
        displayName: "TypeFly",
        description: "TypeFly: Flying Drones with Large Language Model"
    },
    pivot: {
        path: "pivot",
        displayName: "PIVOT",
        description: "PIVOT: Iterative Visual Prompting Elicits Actionable Knowledge for VLMs"
    },
    ours: {
        path: "ours",
        displayName: "Ours"
    }
};

let tasks_sim = [{
    path: 'obstacle',
    displayName: 'Obstacle avoidance',
    prompt: "Avoid obstacles and fly through the building",
    description: "* TypeFly Output: I cannot fly and avoid obstacles simultaneously with my current skills.",
    baselines: [
        baselines.pivot,
        baselines.ours
    ],
    videoCount: 1,
    videoType: 'mp4'
}, {
    path: 'targetid',
    displayName: 'Target identification',
    prompt: "Fly to the car that is nearest to green barrel",
    baselines: [
        baselines.typefly,
        baselines.pivot,
        baselines.ours
    ],
    videoCount: 1,
    videoType: 'mp4'
}, {
    path: 'search',
    displayName: 'Pattern searching',
    prompt: "Search right and fly to the red object",
    baselines: [
        baselines.typefly,
        baselines.pivot,
        baselines.ours
    ],
    videoCount: 1,
    videoType: 'mp4'
}];

let tasks_realworld = [{
    path: 'obstacle',
    displayName: 'Obstacle avoidance',
    prompt: "Fly to the person without hitting the cone",
    baselines: [
        baselines.typefly,
        baselines.pivot,
        baselines.ours
    ],
    videoCount: 1,
    videoType: 'mp4'
}, {
    path: 'reasoning',
    displayName: 'Reasoning',
    prompt: "Fly to the person who needs help",
    baselines: [
        baselines.typefly,
        baselines.pivot,
        baselines.ours
    ],
    videoCount: 1,
    videoType: 'mp4'
}, {
    path: 'long_horizon',
    displayName: 'Long Horizon',
    prompt: "Fly to the cone and the next",
    baselines: [
        baselines.typefly,
        baselines.pivot,
        baselines.ours
    ],
    videoCount: 1,
    videoType: 'mp4'
}, {
    path: 'follow',
    displayName: 'Follow',
    prompt: "Fly toward the person with green shirt",
    baselines: [
        baselines.typefly,
        baselines.pivot,
        baselines.ours
    ],
    videoCount: 1,
    videoType: 'mp4'
}];

function generateVideoGrid(task) {
    const videoContainer = document.getElementById('video_container');

    videoContainer.innerHTML = '';

    for (let j = 1; j <= task.videoCount; j++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        rowDiv.style = 'margin-top: 2em';

        for (let i = 0; i < task.baselines.length; i++) {
            const baseline = task.baselines[i];

            const colDiv = document.createElement('div');
            colDiv.className = 'large-' + (12 / task.baselines.length) + ' columns';

            const video = document.createElement('video');
            video.id = `${baseline.path}_video_${j}`;
            video.className = 'responsive-video';
            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            video.onended = function () { this.currentTime = 0; this.play(); };

            const source = document.createElement('source');
            if (task.videoType.toLowerCase() === 'mp4') {
                source.type = 'video/mp4';
            } else if (task.videoType.toLowerCase() === 'mov') {
                source.type = 'video/quicktime';
            } else {
                source.type = `video/${task.videoType.toLowerCase()}`;
            }
            video.appendChild(source);

            const heading = document.createElement('h5');
            const strong = document.createElement('strong');
            const center = document.createElement('center');

            center.textContent = baseline.displayName;
            // If videoCount is 1, don't show the count, otherwise show baseline and video number
            // if (task.videoCount === 1) {
            //     center.textContent = baseline.displayName;
            // } else {
            //     center.textContent = baseline.displayName + ' ' + j;
            // }

            strong.appendChild(center);
            heading.appendChild(strong);

            const descriptionPara = document.createElement('p');
            descriptionPara.className = 'baseline-description';
            descriptionPara.style = 'text-align: center; font-size: 0.9em; color: #666; margin-top: 5px;';
            descriptionPara.textContent = baseline.description;

            colDiv.appendChild(video);
            colDiv.appendChild(heading);
            colDiv.appendChild(descriptionPara);
            rowDiv.appendChild(colDiv);
        }

        videoContainer.appendChild(rowDiv);
    }
}

function ChangeFrame() {
    let tasks = "";
    if (qualType == "simulator") {
        tasks = tasks_sim;
    } else {
        tasks = tasks_realworld;
    }

    let frame_idx = parseInt(document.getElementById("frame-idx-input").value);
    let currentTask = tasks[frame_idx - 1];
    let taskPath = tasks[frame_idx - 1].path;

    document.getElementById("frame-idx").textContent = frame_idx;
    document.getElementById("frame-total").textContent = tasks.length;
    document.getElementById("sequence_name").innerHTML = ": " + tasks[frame_idx - 1].displayName + "&nbsp;";

    document.getElementById("task-prompt").textContent = tasks[frame_idx - 1].prompt;
    document.getElementById("task-desc").textContent = tasks[frame_idx - 1].description || "";

    generateVideoGrid(currentTask);

    for (let i = 0; i < currentTask.baselines.length; i++) {
        for (let j = 1; j <= currentTask.videoCount; j++) {
            let input_video = document.getElementById(`${currentTask.baselines[i].path}_video_${j}`);
            input_video.src = `../exp_results/${qualType}/${taskPath}/${currentTask.baselines[i].path}_${j}.${currentTask.videoType}`;
            input_video.play();
            // input_video.playbackRate = 1.5;
        }
    }
}

function NextFrame() {
    let frame_idx = parseInt(document.getElementById("frame-idx-input").value);
    if (frame_idx < 8) {
        document.getElementById("frame-idx-input").value = frame_idx + 1;
        ChangeFrame();
    }
}

function PrevFrame() {
    let frame_idx = parseInt(document.getElementById("frame-idx-input").value);
    if (frame_idx > 1) {
        document.getElementById("frame-idx-input").value = frame_idx - 1;
        ChangeFrame();
    }
}

function initPage() {
    const typeParam = getUrlParameter('type');

    if (typeParam === 'simulator') {
        qualType = 'simulator';
        document.getElementById('environment-type').textContent = 'in the simulator';
    } else if (typeParam === 'realworld') {
        qualType = 'realworld';
        document.getElementById('environment-type').textContent = 'in the real-world';
    } else {
        showError('Error: Invalid or missing "type" parameter. Please use "?type=simulator" or "?type=realworld" in the URL.');
        return;
    }

    const tasks = (qualType === 'simulator') ? tasks_sim : tasks_realworld;
    document.getElementById('frame-idx-input').max = tasks.length;
    document.getElementById('frame-total').textContent = tasks.length;

    document.getElementById('frame-idx-input').value = 1;

    ChangeFrame();
}
