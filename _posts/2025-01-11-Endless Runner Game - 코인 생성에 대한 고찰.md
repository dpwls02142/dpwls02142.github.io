---
# Header
layout: post
title: "Endless Runner Game - 코인 생성에 대한 고찰"
date: "2025-01-11"
categories: 
  - Game
tags: 
  - "2025"
  - "unity"
toc: true
toc_sticky: true
---

한 달 동안 각 잡고 게임 개발을 하자고 마음 먹은지 ~~고작~~ 3일째,
<br>endless run 형식의 게임을 유니티로 만들고 있는 중이다.

2학년 전공 수업 때 잠깐 배웠던 것 말고는 아무것도 모르겠어서 머리를 싸매는 중이다..

![image](https://i.pinimg.com/736x/77/35/f1/7735f15c516b3f5181c068c0cb989698.jpg){: width="200"}

유튜브에 endless run 관련 강좌를 보면 enemy를 infinity하게 생성하는건 많은데, 나는 enemy 말고 platform 위에 코인이 무한히 생성되면 좋겠다는 생각을 했다.

근데 코인이 나타나는 경우의 수를 map으로 만들어서 prefab으로 저장한 다음에 random하게 instantiate 하는게 좋을까? 아님 배열에서 코인 prefab을 불러와서 플레이어의 x축 이동량에 따라 random하게 instantiate 하는게 좋을까?

오늘은 ~~부족한 머리를 갖고~~ 후자의 case로 진행을해보았으며, 코드는 다음과 같다.

```cs
using System.Collections.Generic;
using UnityEngine;

public class CoinSpawner : MonoBehaviour
{
    [SerializeField] private GameObject[] coin; // 여러 코인 프리팹 배열
    [SerializeField] private Transform player; // 플레이어의 Transform
    [SerializeField] private float minY = -2.5f; // 최소 생성 좌표값
    [SerializeField] private float maxY = -0.5f; // 최대 생성 좌표값
    [SerializeField] private float xSpacing = 1f; // 코인 간격 (X축)
    [SerializeField] private float ySpacing = 1f; // 코인 간격 (Y축)
    [SerializeField] private float spawnDistance = 20f; // 플레이어로부터 얼마나 멀리 생성할지
    private float lastSpawnX; // 마지막으로 코인을 생성한 X좌표
    private float lastSpawnY; // 마지막으로 코인을 생성한 Y좌표

    private void Start()
    {
        // 플레이어의 초기 위치 기준으로 생성 시작
        lastSpawnX = player.position.x;
        lastSpawnY = minY; // y축 초기 값 설정
    }

    private void Update()
    {
        // 플레이어가 이동할 때마다 코인을 추가 생성
        SpawnCoinsIfNeeded();
        // 플레이어가 못 먹은 코인은 자동 제거
        RemoveOldCoins();
    }

    private void SpawnCoinsIfNeeded()
    {
        // 마지막 생성 위치가 플레이어의 현재 위치 + 스폰 거리보다 작으면 추가 생성
        while (lastSpawnX < player.position.x + spawnDistance)
        {
            // 코인 생성 위치 계산
            Vector2 spawnPosition = new Vector2(lastSpawnX, Random.Range(minY, maxY));

            // 랜덤한 코인 프리팹 선택
            int index = Random.Range(0, coin.Length);
            Instantiate(coin[index], spawnPosition, Quaternion.identity);

            // X축 간격만큼 이동
            lastSpawnX += xSpacing;

            // Y축은 -2.5, -1.5, -0.5 사이 내에서만 제작되어야함.
            lastSpawnY += ySpacing;
            if (lastSpawnY > maxY)
            {
                lastSpawnY = minY; // maxY를 초과하면 다시 minY로 돌아감
            }
        }
    }

    private void RemoveOldCoins()
    {
        foreach (GameObject coin in GameObject.FindGameObjectsWithTag("Coin"))
        {
            if (coin.transform.position.x < player.position.x - 10f) // 플레이어 뒤 10미터 이상 떨어진 코인 제거
            {
                Destroy(coin);
            }
        }
    }

}
```

~~아니 거의 10시간 동안 고민했는데 코드는 겁나 짧네;;~~

일단 Start 함수가 게임을 시작하면 맨 처음에 한 번 호출 되니까 이 때 플레이어의 x 위치를 구해서 lastSpawnX 변수에 넣어줬다.
<br>그러고 Update 함수는 매프레임마다 체크를 하니까, 코인을 spawn해야 되는 조건이 충족된다면 SpawnCoinsIfNeeded()를 호출하고,
<br>플레이어가 무조건 모든 코인을 다 먹는다는 보장은 없으니, 플레이어의 x축에서 -10만큼 먼 곳에 코인이 있다면 그 객체를 지우기 위해 RemoveOldCoin()를 호출한다.

SpawnCoinsIfNeeded()의 로직은 다음과 같다.
- lastSpawnX의 위치가 (player.position.x + spawnDistance) 보다 작다면 코인을 생성
  - spawnDistance의 값은 20으로 설정했는데, 왜그랬냐면 tile map으로 코인을 찍어봤을 때 한 화면 안에 플레이어의 앞에 코인이 쭉 놓여있는 코인 개수가 20개였다.
- 코인이 생성 될 위치를 계산하기 위해 spawnPosition 변수에 x값은 lastSpawnX을, y는 -2.5~-0.5 사이에서 random한 값을 넣어준다.
- 그 후 Inspectore창에서 prefab에 basic coin과 gold coin을 넣고 이를 index로 받아와서 (물론 coin은 2가지 종류밖에 없으니까 그냥 정적 배열로 받아도 될 것 같긴함) Coin prefab을 random하게 선택하고, 위에서 구한 spawnPosition 값을 Instantiate에 넣어서 코인을 생성한다.
- 마지막으로 lastSpawnX에 xSpacing을 누적시켜서 코인간의 x축 간격이 무조건 +1이 되도록 했다. y축은 -2.5, -1.5, -0.5 세가지 값만 선택되도록 했다. 근데 적다보니 느낀건데 이럴거면 그냥 배열로 받아서 랜덤하게 선택하는 편이 더 좋을 것 같다.

근데 일단 이렇게 코인을 생성하면 문제가 있는데,
바로 y축을 랜덤하게 뽑기 때문에 예쁘지않게 코인이 생성된다는 점이다.

점프없이 그냥 바닥면이 쭉 이어진 맵이라면 모를까,
나는 플레이어가 점프도하기 때문에, 코인이 생성되는 조건이 많아서 이걸 다 코드로 만드는게 좋을지.... 일단 현재는 생각이 안 난다....

대체 어떻게 하는게 좋을까?

개발이 편하려면 그냥 첫 몇초간은 점프 구간 없이 쭉 달리다가 노가다 방법으로 map을 여러개 만들어서 random하게 불러오는게 좋을 것 같긴하다는 생각이 든다. 

음.. 좀 더 생각을 해봐야겠다.. 내일도 ㅎㅇㅌ<br>
![alt text](https://i.pinimg.com/736x/5c/e7/8c/5ce78c34739c7e93c557b914a8d9ee8b.jpg){:width="200"}