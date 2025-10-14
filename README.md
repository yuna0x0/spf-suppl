<div align="center">
<h1>Supplementary Material for See, Point, Fly: A Learning-Free VLM Framework for Universal Unmanned Aerial Navigation</h1>

[**Chih Yao Hu**](https://hu-chih-yao.vercel.app)<sup>2*</sup>&emsp;
[**Yang-Sen Lin**](https://www.linkedin.com/in/yang-sen-lin/)<sup>1*</sup>&emsp;
[**Yuna Lee**](https://yuna0x0.com)<sup>1</sup>&emsp;
[**Chih-Hai Su**](https://su-terry.github.io)<sup>1</sup>&emsp;
[**Jie-Ying Lee**](https://jayinnn.dev)<sup>1</sup>&emsp;
<br>
[**Shr-Ruei Tsai**](https://openreview.net/profile?id=~Shr-Ruei_Tsai1)<sup>1</sup>&emsp;
[**Chin-Yang Lin**](https://linjohnss.github.io)<sup>1</sup>&emsp;
[**Kuan-Wen Chen**](https://openreview.net/profile?id=~Kuan-Wen_Chen2)<sup>1</sup>&emsp;
[**Tsung-Wei Ke**](https://twke18.github.io)<sup>2</sup>&emsp;
[**Yu-Lun Liu**](https://yulunalexliu.github.io)<sup>1</sup>&emsp;

<sup>1</sup>National Yang Ming Chiao Tung University&emsp;&emsp;&emsp;<sup>2</sup>National Taiwan University
<br>
*Indicates Equal Contribution

**CoRL 2025**

<a href='https://spf-web.pages.dev'><img src='https://img.shields.io/badge/Project_Page-See, Point, Fly-green' alt='Project Page'></a>
<a href="https://arxiv.org/abs/2509.22653"><img src='https://img.shields.io/badge/arXiv-2509.22653-b31b1b' alt='arXiv'></a>
<a href="https://openreview.net/forum?id=AE299O0tph"><img src='https://img.shields.io/badge/OpenReview-CoRL 2025-b31b1b' alt='OpenReview'></a>
</div>

### :warning: This repo is for the supplementary material only. For the main code repo, please visit [here](https://github.com/Hu-chih-yao/see-point-fly).

- [Supplementary PDF](spf_supplementary.pdf)
- [Supplementary Page (Comparison Videos)](https://spf-web.pages.dev/suppl/)

## Citation
```bibtex
@inproceedings{pmlr-v305-hu25e,
	title        = {See, Point, Fly: A Learning-Free VLM Framework for Universal Unmanned Aerial Navigation},
	author       = {Hu, Chih Yao and Lin, Yang-Sen and Lee, Yuna and Su, Chih-Hai and Lee, Jie-Ying and Tsai, Shr-Ruei and Lin, Chin-Yang and Chen, Kuan-Wen and Ke, Tsung-Wei and Liu, Yu-Lun},
	year         = 2025,
	month        = {27--30 Sep},
	booktitle    = {Proceedings of The 9th Conference on Robot Learning},
	publisher    = {PMLR},
	series       = {Proceedings of Machine Learning Research},
	volume       = 305,
	pages        = {4697--4708},
	url          = {https://proceedings.mlr.press/v305/hu25e.html},
	editor       = {Lim, Joseph and Song, Shuran and Park, Hae-Won},
	pdf          = {https://raw.githubusercontent.com/mlresearch/v305/main/assets/hu25e/hu25e.pdf},
	abstract     = {We present See, Point, Fly (SPF), a training-free aerial vision-and-language navigation (AVLN) framework built atop vision-language models (VLMs). SPF is capable of navigating to any goal based on any type of free-form instructions in any kind of environment. In contrast to existing VLM-based approaches that treat action prediction as a text generation task, our key insight is to consider action prediction for AVLN as a 2D spatial grounding task. SPF harness VLMs to decompose vague language instructions into iterative annotation of 2D waypoints on the input image. Along with the predicted traveling distance, SPF transforms predicted 2D waypoints into 3D displacement vectors as action commands for UAVs. Moreover, SPF also adaptively adjusts the traveling distance to facilitate more efficient navigation. Notably, SPF performs navigation in a closed-loop control manner, enabling UAVs to follow dynamic targets in dynamic environments. SPF sets a new state of the art in DRL simulation benchmark, out performing the previous best method by an absolute margin of 63%. In extensive real-world evaluations, SPF outperforms strong baselines by a large margin. We also conduct comprehensive ablation studies to highlight the effectiveness of our design choice. Lastly, SPF shows remarkable generalization to different VLMs.}
}
```
