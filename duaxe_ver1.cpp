#include <iostream>
#include <string>
#include <Windows.h>
#include <ctime>
using namespace std;

char map[50][50]; // Tao mang 2 chieu
// Ham to mau
void textcolor(int x)
{
	HANDLE mau;
	mau=GetStdHandle

(STD_OUTPUT_HANDLE);
	SetConsoleTextAttribute(mau,x);
}

void VeDuongDua_1()
{
	// Dai 30, rong 30
	for(int i = 0; i < 30; i++)
	{
		map[i][0] = '|';
		map[i][29] = '|';
		if(i % 2 == 0)
		{
			map[i][14] = '|';
		}

		for(int j = 1; j < 29 && j != 14; j++)
		{
			map[i][j] = ' ';
		}
	}
}

void VeDuongDua_2()
{
	// Dai 30, rong 30
	for(int i = 0; i < 30; i++)
	{
		map[i][0] = '|';
		map[i][29] = '|';
		if(i % 2 != 0)
		{
			map[i][14] = '|';
		}

		for(int j = 1; j < 29 && j != 14; j++)
		{
			map[i][j] = ' ';
		}
	}
}

void InDuongDua()
{
	// Dai 30, rong 30
	for(int i = 0; i < 30; i++)
	{
		cout << "\t\t\t";
		for(int j = 0; j < 30; j++)
		{
			/* ============ In Duong Dua ========== */
			if(j == 0 || j == 29)
			{
				textcolor(191);
				map[i][j] = ' ';
				cout << map[i][j];
				textcolor(7);
			}
			else if(j == 14)
			{
				textcolor(15);
				cout << map[i][j];
				textcolor(7);

				map[i][j] = ' '; // Xóa lằn đi.
			}

			/* ================================= */

			/* in xe Player */
			else if(map[i][j] == 'X' || map[i][j] == '@' || map[i][j] == '#')
			{
				textcolor(14); // Mau vang
				cout << map[i][j];
				textcolor(7); // Tro lai mau binh thuong
			}

			/* In xe Computer */
			else if(map[i][j] == '!')
			{
				//map[i][j] = ' '; // Bỏ đi ký tự '!'
				textcolor(200);
				cout << map[i][j];
				textcolor(7);
			}

			// Nhung ki tu khong phai xe
			else
			{
				cout << map[i][j];
			}
		}
		cout << endl;
	}
}


int main(){

    int a = 0;
	while(true)
	{
		a++;
		if(a % 2 != 0)
		{
			VeDuongDua_1();
		}
		else
		{
			VeDuongDua_2();
		}
		
			InDuongDua();
    return 0;
}
}
